import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoutineExercise } from '../../auth/entities/routine-exercise.entity';
import { Routine } from '../../auth/entities/routine.entity';
import { Exercise } from '../../auth/entities/exercise.entity';

import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';

@Injectable()
export class RoutineExerciseService {
    constructor(
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    async create(createRoutineExerciseDto: CreateRoutineExerciseDto): Promise<RoutineExercise> {
        const { routineId, exerciseId, ...data } = createRoutineExerciseDto;

        const routine = await this.routineRepository.findOneBy({ id: routineId });
        if (!routine) {
            throw new NotFoundException(`La rutina con id '${routineId}' no existe en el sistema.`);
        }

        const exercise = await this.exerciseRepository.findOneBy({ id: exerciseId });
        if (!exercise) {
            throw new NotFoundException(`El ejercicio con id '${exerciseId}' no existe en el sistema.`);
        }

        const newRoutineExercise = this.routineExerciseRepository.create({ ...data, routine, exercise });
        return await this.routineExerciseRepository.save(newRoutineExercise);
    }

    async findAll(): Promise<RoutineExercise[]> {
        return await this.routineExerciseRepository.find({
            relations: {
                routine: true,
                exercise: true,
            },
            order: {
                orderIndex: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<RoutineExercise> {
        const routineExercise = await this.routineExerciseRepository.findOne({
            where: { id },
            relations: {
                routine: true,
                exercise: true,
            },
        });
        if (!routineExercise) {
            throw new NotFoundException(`El ejercicio de rutina con id '${id}' no existe en el sistema.`);
        }
        return routineExercise;
    }

    async update(id: number, updateRoutineExerciseDto: UpdateRoutineExerciseDto): Promise<RoutineExercise> {
        const routineExercise = await this.findOne(id);

        if (updateRoutineExerciseDto.routineId) {
            const routine = await this.routineRepository.findOneBy({ id: updateRoutineExerciseDto.routineId });
            if (!routine) {
                throw new NotFoundException(
                    `La rutina con id '${updateRoutineExerciseDto.routineId}' no existe en el sistema.`,
                );
            }
            routineExercise.routine = routine;
        }

        if (updateRoutineExerciseDto.exerciseId) {
            const exercise = await this.exerciseRepository.findOneBy({ id: updateRoutineExerciseDto.exerciseId });
            if (!exercise) {
                throw new NotFoundException(
                    `El ejercicio con id '${updateRoutineExerciseDto.exerciseId}' no existe en el sistema.`,
                );
            }
            routineExercise.exercise = exercise;
        }

        const { routineId, exerciseId, ...data } = updateRoutineExerciseDto;
        const updated = this.routineExerciseRepository.merge(routineExercise, data);
        return await this.routineExerciseRepository.save(updated);
    }

    async remove(id: number): Promise<{ id: number }> {
        const routineExercise = await this.findOne(id);
        await this.routineExerciseRepository.remove(routineExercise);
        return { id };
    }
}
