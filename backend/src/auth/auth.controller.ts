import { Controller, Post, Get, Patch, Delete, Body, Param, UnauthorizedException, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
    async register(@Body() body: any) {
        const { email, password, ...extraData } = body;
        return this.usersService.create(email, password, extraData);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({ status: 200, description: 'Token de acceso generado' })
    async login(@Body() body: any) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        return this.authService.login(user);
    }

    @Get('users')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Listar todos los usuarios (solo admin)' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 403, description: 'No autorizado (requiere rol admin)' })
    async getAllUsers() {
        const users = await this.usersService.findAll();
        return users.map(user => ({
            id: user?._id,
            email: user?.email,
            role: user?.role,
            createdAt: user?.['createdAt']
        }));
    }

    @Patch('users/:id/role')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar rol de usuario (solo admin)' })
    @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 403, description: 'No autorizado (requiere rol admin)' })
    async updateUserRole(@Param('id') id: string, @Body() body: { role: string }) {
        const user = await this.usersService.updateRole(id, body.role);
        return {
            id: user?._id,
            email: user?.email,
            role: user?.role
        };
    }

    @Delete('users/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Eliminar usuario (solo admin)' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 403, description: 'No autorizado (requiere rol admin)' })
    async deleteUser(@Param('id') id: string) {
        await this.usersService.deleteUser(id);
        return { message: 'Usuario eliminado exitosamente' };
    }
}
