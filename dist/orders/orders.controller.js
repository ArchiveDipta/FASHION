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
exports.OrdersController = exports.CheckoutDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const orders_service_1 = require("./orders.service");
class CheckoutDto {
}
exports.CheckoutDto = CheckoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Jl. Merdeka No.1, Jakarta Pusat',
        description: 'Alamat pengiriman (opsional)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckoutDto.prototype, "address", void 0);
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    checkout(req, body) {
        return this.ordersService.checkout(req.user.userId, body.address);
    }
    getMyOrders(req) {
        return this.ordersService.getMyOrders(req.user.userId);
    }
    getOrderDetail(req, id) {
        return this.ordersService.getOrderDetail(req.user.userId, id);
    }
    payOrder(req, id) {
        return this.ordersService.payOrder(req.user.userId, id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)('checkout'),
    (0, swagger_1.ApiOperation)({ summary: 'Checkout — buat order dari isi keranjang' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order berhasil dibuat, keranjang dikosongkan' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Keranjang kosong' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CheckoutDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "checkout", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat semua order saya' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar order berhasil diambil' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getMyOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat detail satu order' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail order berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order tidak ditemukan' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrderDetail", null);
__decorate([
    (0, common_1.Post)(':id/pay'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifikasi Pembayaran (Simulasi Sederhana)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pembayaran berhasil diverifikasi' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Order tidak valid untuk dibayar' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order tidak ditemukan' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "payOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map