"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const express = require("express");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma/prisma.service");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.use('/uploads', express.static((0, path_1.join)(process.cwd(), 'uploads')));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Fashion Ecommerce API')
        .setDescription(`## API untuk aplikasi e-commerce Fashion\n\n` +
        `### Cara menggunakan:\n` +
        `1. Daftar akun via **POST /auth/register**\n` +
        `2. Login via **POST /auth/login** → copy token dari response\n` +
        `3. Klik tombol **Authorize 🔒** di kanan atas\n` +
        `4. Paste token → klik **Authorize** → sekarang semua endpoint bisa diakses`)
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Masukkan JWT token dari response login',
    }, 'bearer')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });
    const prisma = app.get(prisma_service_1.PrismaService);
    await prisma.enableShutdownHooks(app);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map