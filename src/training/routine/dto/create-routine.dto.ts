import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoutineDto {
    @IsInt({ message: 'El id del usuario debe ser un número entero' })
    @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
    userId!: number;

    @IsString({ message: 'El nombre de la rutina debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de la rutina es obligatorio' })
    @MaxLength(100, { message: 'El nombre de la rutina no puede superar 100 caracteres' })
    name!: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    description?: string;
}
