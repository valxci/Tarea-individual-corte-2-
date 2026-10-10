import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityExercise } from '../../auth/entities/activity-exercise.entity';
import { ActivityLog } from '../../auth/entities/activity-log.entity';
import { RoutineExercise } from '../../auth/entities/routine-exercise.entity';

import { CreateActivityExerciseDto } from './dto/create-activity-exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity-exercise.dto';

@Injectable()
export class ActivityExerciseService {
    constructor(
        @InjectRepository(ActivityExercise)
        private readonly activityExerciseRepository: Repository<ActivityExercise>,
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
    ) {}

    async create(createActivityExerciseDto: CreateActivityExerciseDto): Promise<ActivityExercise> {
        const { activityLogId, routineExerciseId, ...data } = createActivityExerciseDto;

        const activityLog = await this.activityLogRepository.findOneBy({ id: activityLogId });
        if (!activityLog) {
            throw new NotFoundException(`El registro de actividad con id '${activityLogId}' no existe en el sistema.`);
        }

        const routineExercise = await this.routineExerciseRepository.findOneBy({ id: routineExerciseId });
        if (!routineExercise) {
            throw new NotFoundException(`El ejercicio de rutina con id '${routineExerciseId}' no existe en el sistema.`);
        }

        const newActivityExercise = this.activityExerciseRepository.create({ ...data, activityLog, routineExercise });
        return await this.activityExerciseRepository.save(newActivityExercise);
    }

    async findAll(): Promise<ActivityExercise[]> {
        return await this.activityExerciseRepository.find({
            relations: {
                activityLog: true,
                routineExercise: true,
            },
        });
    }

    async findOne(id: number): Promise<ActivityExercise> {
        const activityExercise = await this.activityExerciseRepository.findOne({
            where: { id },
            relations: {
                activityLog: true,
                routineExercise: true,
            },
        });
        if (!activityExercise) {
            throw new NotFoundException(`El ejercicio de actividad con id '${id}' no existe en el sistema.`);
        }
        return activityExercise;
    }

    async update(id: number, updateActivityExerciseDto: UpdateActivityExerciseDto): Promise<ActivityExercise> {
        const activityExercise = await this.findOne(id);

        if (updateActivityExerciseDto.activityLogId) {
            const activityLog = await this.activityLogRepository.findOneBy({
                id: updateActivityExerciseDto.activityLogId,
            });
            if (!activityLog) {
                throw new NotFoundException(
                    `El registro de actividad con id '${updateActivityExerciseDto.activityLogId}' no existe en el sistema.`,
                );
            }
            activityExercise.activityLog = activityLog;
        }

        if (updateActivityExerciseDto.routineExerciseId) {
            const routineExercise = await this.routineExerciseRepository.findOneBy({
                id: updateActivityExerciseDto.routineExerciseId,
            });
            if (!routineExercise) {
                throw new NotFoundException(
                    `El ejercicio de rutina con id '${updateActivityExerciseDto.routineExerciseId}' no existe en el sistema.`,
                );
            }
            activityExercise.routineExercise = routineExercise;
        }

        const { activityLogId, routineExerciseId, ...data } = updateActivityExerciseDto;
        const updated = this.activityExerciseRepository.merge(activityExercise, data);
        return await this.activityExerciseRepository.save(updated);
    }

    async remove(id: number): Promise<{ id: number }> {
        const activityExercise = await this.findOne(id);
        await this.activityExerciseRepository.remove(activityExercise);
        return { id };
    }
}
