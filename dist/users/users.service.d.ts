import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        name: string | null;
        email: string;
        password: string;
        phone: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    findById(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    updateProfile(id: number, data: {
        name?: string;
        phone?: string;
        address?: string;
    }): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
}
