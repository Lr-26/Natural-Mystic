import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService) { }

    @Post()
    async createMessage(@Body() body: any) {
        return this.contactService.saveMessage(body);
    }

    @Get()
    async getMessages() {
        return this.contactService.findAll();
    }
}
