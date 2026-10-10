import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateActivityLogDto {
    @IsInt({ message: 'El id del usuario debe ser un número entero' })
    @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
    userId!: number;

    @IsInt({ message: 'El id de la rutina debe ser un número entero' })
    @IsNotEmpty({ message: 'El id de la rutina es obligatorio' })
    routineId!: number;

    @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida (ISO 8601)' })
    @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
    startedAt!: string;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de finalización debe ser una fecha válida (ISO 8601)' })
    completedAt?: string;
}
