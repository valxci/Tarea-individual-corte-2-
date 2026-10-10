import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateRoutineExerciseDto {
    @IsInt({ message: 'El id de la rutina debe ser un número entero' })
    @IsNotEmpty({ message: 'El id de la rutina es obligatorio' })
    routineId!: number;

    @IsInt({ message: 'El id del ejercicio debe ser un número entero' })
    @IsNotEmpty({ message: 'El id del ejercicio es obligatorio' })
    exerciseId!: number;

    @IsInt({ message: 'El orden debe ser un número entero' })
    @IsNotEmpty({ message: 'El orden del ejercicio es obligatorio' })
    @IsPositive({ message: 'El orden debe ser un valor positivo' })
    orderIndex!: number;

    @IsOptional()
    @IsInt({ message: 'Las series objetivo deben ser un número entero' })
    @IsPositive({ message: 'Las series objetivo deben ser un valor positivo' })
    targetSets?: number;

    @IsOptional()
    @IsInt({ message: 'Las repeticiones objetivo deben ser un número entero' })
    @IsPositive({ message: 'Las repeticiones objetivo deben ser un valor positivo' })
    targetReps?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El peso objetivo debe ser un número' })
    @IsPositive({ message: 'El peso objetivo debe ser un valor positivo' })
    targetWeightKg?: number;

    @IsOptional()
    @IsInt({ message: 'La duración objetivo debe ser un número entero' })
    @IsPositive({ message: 'La duración objetivo debe ser un valor positivo' })
    targetDurationMin?: number;
}
