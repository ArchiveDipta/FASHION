"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : 'Internal Server Error';
        let debugMessage = undefined;
        if (status === common_1.HttpStatus.INTERNAL_SERVER_ERROR && exception instanceof Error) {
            debugMessage = exception.message;
        }
        if (exception && typeof exception === 'object' && 'code' in exception) {
            const prismaError = exception;
            if (prismaError.code === 'P2002') {
                status = common_1.HttpStatus.CONFLICT;
                message = 'Data already exists (Unique constraint failed)';
            }
            else if (prismaError.code === 'P2025') {
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Record not found';
            }
            else if (prismaError.code === 'P2003') {
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Foreign key constraint failed (Reference does not exist)';
            }
            else if (prismaError.code) {
                status = common_1.HttpStatus.BAD_REQUEST;
                message = `Database Error: ${prismaError.code}`;
            }
        }
        response.status(status).json({
            success: false,
            statusCode: status,
            path: request.url,
            message,
            debug: debugMessage,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map