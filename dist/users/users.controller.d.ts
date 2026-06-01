import { UsersService } from './users.service';
export declare class UpdateProfileDto {
    name?: string;
    phone?: string;
    address?: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    updateProfile(req: any, body: UpdateProfileDto): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
}
