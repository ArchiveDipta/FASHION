"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, files) {
        return this.prisma.product.create({
            data: {
                ...dto,
                images: {
                    create: files.map((file) => ({
                        imageUrl: `/uploads/products/${file.filename}`,
                    })),
                },
            },
            include: {
                category: true,
                images: true,
            },
        });
    }
    async findAll(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                name: {
                    contains: search,
                },
            }
            : {};
        const data = await this.prisma.product.findMany({
            skip,
            take: limit,
            where,
            include: {
                category: true,
                images: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        const total = await this.prisma.product.count({
            where,
        });
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                images: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async update(id, dto, files) {
        await this.findOne(id);
        await this.prisma.product.update({
            where: { id },
            data: {
                ...dto,
            },
        });
        if (files &&
            files.length) {
            await this.prisma.productImage.createMany({
                data: files.map((file) => ({
                    productId: id,
                    imageUrl: `/uploads/products/${file.filename}`,
                })),
            });
        }
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.delete({
            where: { id },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map