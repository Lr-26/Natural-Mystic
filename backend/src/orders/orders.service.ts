import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) { }

    async create(orderData: any): Promise<OrderDocument> {
        const orderNumber = this.generateOrderNumber();
        const newOrder = new this.orderModel({
            ...orderData,
            orderNumber,
        });
        return newOrder.save();
    }

    async findAll(): Promise<OrderDocument[]> {
        return this.orderModel.find().sort({ createdAt: -1 }).exec();
    }

    async findByUserId(userId: string): Promise<OrderDocument[]> {
        return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }

    async findById(id: string): Promise<OrderDocument | null> {
        return this.orderModel.findById(id).exec();
    }

    async updateStatus(id: string, status: string): Promise<OrderDocument | null> {
        return this.orderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).exec();
    }

    async updatePaymentStatus(id: string, paymentStatus: string): Promise<OrderDocument | null> {
        return this.orderModel.findByIdAndUpdate(
            id,
            { paymentStatus },
            { new: true }
        ).exec();
    }

    private generateOrderNumber(): string {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `NM-${timestamp}-${random}`;
    }
}
