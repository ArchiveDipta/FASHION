export declare class SupabaseService {
    private supabase;
    private bucketName;
    constructor();
    uploadImage(file: Express.Multer.File): Promise<string>;
}
