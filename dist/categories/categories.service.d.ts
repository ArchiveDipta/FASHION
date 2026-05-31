import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
        slug: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        slug: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        slug: string;
    }>;
    update(id: number, dto: UpdateCategoryDto): Promise<{
        id: number;
        name: string;
        slug: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        slug: string;
    }>;
}
