import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        email: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    findById(id: number): Promise<{
        email: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
}
