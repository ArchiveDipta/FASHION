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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = exports.UpdateCartDto = exports.AddToCartDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const cart_service_1 = require("./cart.service");
class AddToCartDto {
}
exports.AddToCartDto = AddToCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID produk yang ingin ditambahkan' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AddToCartDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Jumlah produk', required: false, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddToCartDto.prototype, "quantity", void 0);
class UpdateCartDto {
}
exports.UpdateCartDto = UpdateCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Jumlah baru (0 = hapus item)' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCartDto.prototype, "quantity", void 0);
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart(req) {
        return this.cartService.getCart(req.user.userId);
    }
    addToCart(req, body) {
        return this.cartService.addToCart(req.user.userId, body.productId, body.quantity ?? 1);
    }
    updateCartItem(req, id, body) {
        return this.cartService.updateCartItem(req.user.userId, id, body.quantity);
    }
    removeFromCart(req, id) {
        return this.cartService.removeFromCart(req.user.userId, id);
    }
    clearCart(req) {
        return this.cartService.clearCart(req.user.userId);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat isi keranjang belanja saya' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar item keranjang' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah produk ke keranjang' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Produk berhasil ditambahkan ke keranjang' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produk tidak ditemukan' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update jumlah item keranjang (quantity 0 = hapus)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Jumlah item berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item keranjang tidak ditemukan' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, UpdateCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus satu item dari keranjang' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item berhasil dihapus dari keranjang' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item keranjang tidak ditemukan' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Kosongkan semua isi keranjang' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Keranjang berhasil dikosongkan' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map