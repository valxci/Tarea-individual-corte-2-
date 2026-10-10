import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PermissionsGuard } from '../guards/permissions/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('manage_roles')
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Permissions('manage_roles')
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('manage_roles')
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(+id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('manage_roles')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions('manage_roles')
    async remove(@Param('id') id: string) {
        await this.roleService.remove(+id);
    }
}
