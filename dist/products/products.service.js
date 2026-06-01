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
    async create(createProductDto, files) {
        const { categoryId, image, ...rest } = createProductDto;
        const imageData = files?.map((file) => ({
            imageUrl: `/uploads/${file.filename}`,
        })) || [];
        return this.prisma.product.create({
            data: {
                name: rest.name,
                price: rest.price,
                description: rest.description,
                stock: rest.stock ?? 0,
                category: {
                    connect: { id: categoryId },
                },
                images: {
                    create: imageData,
                },
            },
            include: {
                category: true,
                images: true,
            },
        });
    }
    async findAll(page, limit, search) {
        const where = search
            ? {
                name: {
                    contains: search,
                    mode: 'insensitive',
                },
            }
            : {};
        const skip = page && limit ? (page - 1) * limit : undefined;
        const take = limit || undefined;
        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take,
                include: {
                    category: true,
                    images: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page: page || 1,
                limit: limit || total,
                totalPages: limit ? Math.ceil(total / limit) : 1,
            },
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
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto, files) {
        const { categoryId, image, ...rest } = updateProductDto;
        await this.findOne(id);
        if (files && files.length > 0) {
            await this.prisma.productImage.deleteMany({
                where: { productId: id },
            });
        }
        const imageData = files?.map((file) => ({
            imageUrl: `/uploads/${file.filename}`,
        })) || [];
        return this.prisma.product.update({
            where: { id },
            data: {
                ...(rest.name && { name: rest.name }),
                ...(rest.price !== undefined && { price: rest.price }),
                ...(rest.description !== undefined && { description: rest.description }),
                ...(rest.stock !== undefined && { stock: rest.stock }),
                ...(categoryId && {
                    category: {
                        connect: { id: categoryId },
                    },
                }),
                ...(imageData.length > 0 && {
                    images: {
                        create: imageData,
                    },
                }),
            },
            include: {
                category: true,
                images: true,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.productImage.deleteMany({
            where: { productId: id },
        });
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