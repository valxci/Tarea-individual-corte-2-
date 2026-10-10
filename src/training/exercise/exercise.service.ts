import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Exercise } from '../../auth/entities/exercise.entity';

import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
        const newExercise = this.exerciseRepository.create(createExerciseDto);
        return await this.exerciseRepository.save(newExercise);
    }

    async findAll(): Promise<Exercise[]> {
        return await this.exerciseRepository.find({
            order: {
                name: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOneBy({ id });
        if (!exercise) {
            throw new NotFoundException(`El ejercicio con id '${id}' no existe en el sistema.`);
        }
        return exercise;
    }

    async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
        const exercise = await this.findOne(id);
        const updatedExercise = this.exerciseRepository.merge(exercise, updateExerciseDto);
        return await this.exerciseRepository.save(updatedExercise);
    }

    async remove(id: number): Promise<{ id: number }> {
        const exercise = await this.findOne(id);
        await this.exerciseRepository.remove(exercise);
        return { id };
    }
}
