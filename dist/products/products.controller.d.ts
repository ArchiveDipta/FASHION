export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, files?: Express.Multer.File[]): any;
    findAll(page?: string, limit?: string, search?: string): any;
    findOne(id: number): any;
    update(id: number, updateProductDto: UpdateProductDto, files?: Express.Multer.File[]): any;
    remove(id: number): any;
}
