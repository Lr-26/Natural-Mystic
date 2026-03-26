import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;
    private readonly siteUrl = process.env.FRONTEND_URL || 'http://localhost:5174';

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'tu-correo@gmail.com',
                pass: process.env.GMAIL_PASS || 'tu-password-de-aplicacion'
            }
        });
    }

    async sendWelcomeEmail(email: string, name: string) {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) return;

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600&display=swap');
                    
                    body { margin: 0; padding: 0; background-color: #0c0908; color: #f3e5d8; font-family: 'Montserrat', sans-serif; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #120e0d; border: 1px solid #d48c9d30; }
                    .header { padding: 40px 20px; text-align: center; border-bottom: 1px solid #d48c9d20; background: linear-gradient(135deg, #1a1412 0%, #0c0908 100%); }
                    .logo { font-family: 'Cinzel', serif; color: #d48c9d; font-size: 28px; letter-spacing: 5px; text-transform: uppercase; margin: 0; }
                    .content { padding: 40px 30px; text-align: center; }
                    .welcome-title { font-family: 'Cinzel', serif; color: #ffffff; font-size: 24px; margin-bottom: 20px; letter-spacing: 2px; }
                    .description { color: #f3e5d8; opacity: 0.8; line-height: 1.8; font-size: 16px; margin-bottom: 30px; }
                    .cta-button { 
                        display: inline-block; 
                        padding: 18px 40px; 
                        background-color: #d48c9d; 
                        color: #0c0908 !important; 
                        text-decoration: none; 
                        font-family: 'Cinzel', serif; 
                        font-weight: bold; 
                        text-transform: uppercase; 
                        letter-spacing: 3px; 
                        font-size: 14px;
                        box-shadow: 0 4px 20px rgba(212, 140, 157, 0.3);
                        border-radius: 2px;
                    }
                    .footer { padding: 30px; text-align: center; font-size: 10px; color: #d48c9d80; text-transform: uppercase; letter-spacing: 2px; border-top: 1px solid #d48c9d10; }
                    .accent-line { width: 50px; height: 1px; background-color: #d48c9d; margin: 20px auto; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 class="logo">Natural Mystic</h1>
                        <div class="accent-line"></div>
                    </div>
                    <div class="content">
                        <h2 class="welcome-title">Bienvenido a la Tribu, ${name}</h2>
                        <p class="description">
                            Has cruzado el umbral hacia una experiencia alquímica única. <br>
                            Tu esencia ahora forma parte de nuestro círculo sagrado.
                        </p>
                        <div style="margin: 40px 0;">
                            <a href="${this.siteUrl}" class="cta-button">Ver Mi Destino</a>
                        </div>
                        <p class="description" style="font-size: 14px;">
                            Explora nuestros tesoros botánicos, velas ritualizadas y secretos de bienestar ancestral.
                        </p>
                    </div>
                    <div class="footer">
                        Alquimia Digital & Bienestar Terrenal<br>
                        © 2026 Natural Mystic
                    </div>
                </div>
            </body>
            </html>
        `;

        try {
            await this.transporter.sendMail({
                from: `"Natural Mystic" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: `✨ Bienvenido a la Alquimia, ${name}`,
                html: html
            });
            console.log(`Welcome email sent to: ${email}`);
        } catch (error) {
            console.error('Error sending welcome email:', error);
        }
    }

    async sendContactNotification(messageData: any) {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) return;

        const html = `
            <div style="font-family: 'Cinzel', serif; background-color: #0c0c0c; color: #f3e5d8; padding: 40px; border: 1px solid #d48c9d;">
                <h2 style="color: #d48c9d; text-align: center; border-bottom: 1px solid #d48c9d50; padding-bottom: 20px;">Nueva Visión del Cosmos</h2>
                <p><strong>De:</strong> ${messageData.name} ${messageData.lastName} (${messageData.email})</p>
                <p><strong>Teléfono:</strong> ${messageData.phone}</p>
                <p><strong>Asunto:</strong> ${messageData.subject}</p>
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <p style="font-style: italic;">"${messageData.message}"</p>
                </div>
                <p style="font-size: 10px; margin-top: 30px; opacity: 0.5; text-align: center;">Este mensaje ha sido guardado en tu base de datos sagrada.</p>
            </div>
        `;

        try {
            await this.transporter.sendMail({
                from: `"Natural Mystic - Contacto" <${process.env.GMAIL_USER}>`,
                to: process.env.GMAIL_USER, // Notificación al admin
                subject: `Nuevo mensaje de ${messageData.name}: ${messageData.subject}`,
                html: html
            });
        } catch (error) {
            console.error('Error sending contact notification:', error);
        }
    }
}
