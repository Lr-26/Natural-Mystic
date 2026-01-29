import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Lista de productos', type: [Product] })
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un producto por ID' })
    @ApiResponse({ status: 200, description: 'Producto encontrado', type: Product })
    async findOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto (Protegido)' })
    @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: Product })
    async create(@Body() createProductDto: any): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un producto (Protegido)' })
    async delete(@Param('id') id: string) {
        return this.productsService.delete(id);
    }
}
