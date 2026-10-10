import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateExerciseDto {
    @IsString({ message: 'El nombre del ejercicio debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre del ejercicio es obligatorio' })
    @MaxLength(100, { message: 'El nombre del ejercicio no puede superar 100 caracteres' })
    name!: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    description!: string;

    @IsString({ message: 'El tipo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El tipo de ejercicio es obligatorio' })
    @MaxLength(50, { message: 'El tipo no puede superar 50 caracteres' })
    type!: string;

    @IsOptional()
    @IsNumber({}, { message: 'Las calorías estimadas deben ser un número' })
    @IsPositive({ message: 'Las calorías estimadas deben ser un valor positivo' })
    estimatedCalories?: number;

    @IsOptional()
    @IsNumber({}, { message: 'La distancia estimada debe ser un número' })
    @IsPositive({ message: 'La distancia estimada debe ser un valor positivo' })
    estimatedDistanceKm?: number;

    @IsOptional()
    @IsNumber({}, { message: 'La duración estimada debe ser un número' })
    @IsPositive({ message: 'La duración estimada debe ser un valor positivo' })
    estimatedDurationMin?: number;

    @IsOptional()
    @IsString({ message: 'El icono debe ser una cadena de texto' })
    @MaxLength(100, { message: 'El icono no puede superar 100 caracteres' })
    icon?: string;
}
