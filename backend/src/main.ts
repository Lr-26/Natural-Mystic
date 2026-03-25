import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Security - Disable some protections only in DEV to allow the proxy to work smoothly
  if (process.env.NODE_ENV !== 'production') {
    app.use(helmet({
      contentSecurityPolicy: false, 
    }));
  } else {
    app.use(helmet());
  }

  // ONE PORT CONFIG: Proxy all frontend requests to Vite (5174)
  if (process.env.NODE_ENV !== 'production') {
    const { createProxyMiddleware } = require('http-proxy-middleware');
    app.use((req, res, next) => {
        // Only proxy if NOT starting with /api or /docs
        if (req.url.startsWith('/api') || req.url.startsWith('/docs')) {
          return next();
        }
        return createProxyMiddleware({
          target: 'http://localhost:5174',
          changeOrigin: true,
          ws: true,
        })(req, res, next);
    });
  }

  app.enableCors({
    origin: '*', 
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Natural Mystic API')
    .setDescription('The official API for Natural Mystic E-commerce')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation at: ${await app.getUrl()}/api/docs`);
}
bootstrap();
