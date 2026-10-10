import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateActivityExerciseDto {
    @IsInt({ message: 'El id del registro de actividad debe ser un número entero' })
    @IsNotEmpty({ message: 'El id del registro de actividad es obligatorio' })
    activityLogId!: number;

    @IsInt({ message: 'El id del ejercicio de rutina debe ser un número entero' })
    @IsNotEmpty({ message: 'El id del ejercicio de rutina es obligatorio' })
    routineExerciseId!: number;

    @IsOptional()
    @IsInt({ message: 'Las series reales deben ser un número entero' })
    @IsPositive({ message: 'Las series reales deben ser un valor positivo' })
    actualSets?: number;

    @IsOptional()
    @IsInt({ message: 'Las repeticiones reales deben ser un número entero' })
    @IsPositive({ message: 'Las repeticiones reales deben ser un valor positivo' })
    actualReps?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El peso real debe ser un número' })
    @IsPositive({ message: 'El peso real debe ser un valor positivo' })
    actualWeightKg?: number;

    @IsOptional()
    @IsInt({ message: 'La duración real debe ser un número entero' })
    @IsPositive({ message: 'La duración real debe ser un valor positivo' })
    actualDurationMin?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Las calorías quemadas deben ser un número' })
    @IsPositive({ message: 'Las calorías quemadas deben ser un valor positivo' })
    caloriesBurned?: number;

    @IsOptional()
    @IsNumber({}, { message: 'La distancia recorrida debe ser un número' })
    @IsPositive({ message: 'La distancia recorrida debe ser un valor positivo' })
    distanceCoveredKm?: number;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida ' })
    startedAt?: string;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de finalización debe ser una fecha válida' })
    completedAt?: string;
}
