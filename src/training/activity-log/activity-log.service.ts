import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityLog } from '../../auth/entities/activity-log.entity';
import { User } from '../../auth/entities/user.entity';
import { Routine } from '../../auth/entities/routine.entity';

import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
    ) {}

    async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
        const { userId, routineId, ...data } = createActivityLogDto;

        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException(`El usuario con id '${userId}' no existe en el sistema.`);
        }

        const routine = await this.routineRepository.findOneBy({ id: routineId });
        if (!routine) {
            throw new NotFoundException(`La rutina con id '${routineId}' no existe en el sistema.`);
        }

        const newActivityLog = this.activityLogRepository.create({ ...data, user, routine });
        return await this.activityLogRepository.save(newActivityLog);
    }

    async findAll(): Promise<ActivityLog[]> {
        return await this.activityLogRepository.find({
            relations: {
                user: true,
                routine: true,
            },
            order: {
                startedAt: 'DESC',
            },
        });
    }

    async findOne(id: number): Promise<ActivityLog> {
        const activityLog = await this.activityLogRepository.findOne({
            where: { id },
            relations: {
                user: true,
                routine: true,
                activityExercises: true,
            },
        });
        if (!activityLog) {
            throw new NotFoundException(`El registro de actividad con id '${id}' no existe en el sistema.`);
        }
        return activityLog;
    }

    async update(id: number, updateActivityLogDto: UpdateActivityLogDto): Promise<ActivityLog> {
        const activityLog = await this.findOne(id);

        if (updateActivityLogDto.userId) {
            const user = await this.userRepository.findOneBy({ id: updateActivityLogDto.userId });
            if (!user) {
                throw new NotFoundException(`El usuario con id '${updateActivityLogDto.userId}' no existe en el sistema.`);
            }
            activityLog.user = user;
        }

        if (updateActivityLogDto.routineId) {
            const routine = await this.routineRepository.findOneBy({ id: updateActivityLogDto.routineId });
            if (!routine) {
                throw new NotFoundException(`La rutina con id '${updateActivityLogDto.routineId}' no existe en el sistema.`);
            }
            activityLog.routine = routine;
        }

        const { userId, routineId, ...data } = updateActivityLogDto;
        const updated = this.activityLogRepository.merge(activityLog, data);
        return await this.activityLogRepository.save(updated);
    }

    async remove(id: number): Promise<{ id: number }> {
        const activityLog = await this.findOne(id);
        await this.activityLogRepository.remove(activityLog);
        return { id };
    }
}
