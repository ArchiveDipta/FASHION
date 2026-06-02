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
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const path_1 = require("path");
let SupabaseService = class SupabaseService {
    constructor() {
        this.bucketName = process.env.SUPABASE_BUCKET || 'products-images';
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    }
    async uploadImage(file) {
        try {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileExt = (0, path_1.extname)(file.originalname);
            const fileName = `${uniqueSuffix}${fileExt}`;
            const { data, error } = await this.supabase.storage
                .from(this.bucketName)
                .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: false,
            });
            if (error) {
                throw error;
            }
            const { data: publicUrlData } = this.supabase.storage
                .from(this.bucketName)
                .getPublicUrl(fileName);
            return publicUrlData.publicUrl;
        }
        catch (error) {
            console.error('Supabase Upload Error:', error);
            throw new common_1.InternalServerErrorException('Gagal mengunggah gambar ke Supabase Storage');
        }
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map