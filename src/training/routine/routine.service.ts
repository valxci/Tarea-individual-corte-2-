import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Routine } from '../../auth/entities/routine.entity';
import { User } from '../../auth/entities/user.entity';

import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createRoutineDto: CreateRoutineDto): Promise<Routine> {
        const { userId, ...routineData } = createRoutineDto;

        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException(`El usuario con id '${userId}' no existe en el sistema.`);
        }

        const newRoutine = this.routineRepository.create({ ...routineData, user });
        return await this.routineRepository.save(newRoutine);
    }

    async findAll(): Promise<Routine[]> {
        return await this.routineRepository.find({
            relations: {
                user: true,
            },
            order: {
                name: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<Routine> {
        const routine = await this.routineRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
        });
        if (!routine) {
            throw new NotFoundException(`La rutina con id '${id}' no existe en el sistema.`);
        }
        return routine;
    }

    async update(id: number, updateRoutineDto: UpdateRoutineDto): Promise<Routine> {
        const routine = await this.findOne(id);

        if (updateRoutineDto.userId) {
            const user = await this.userRepository.findOneBy({ id: updateRoutineDto.userId });
            if (!user) {
                throw new NotFoundException(`El usuario con id '${updateRoutineDto.userId}' no existe en el sistema.`);
            }
            routine.user = user;
        }

        const { userId, ...routineData } = updateRoutineDto;
        const updatedRoutine = this.routineRepository.merge(routine, routineData);
        return await this.routineRepository.save(updatedRoutine);
    }

    async remove(id: number): Promise<{ id: number }> {
        const routine = await this.findOne(id);
        await this.routineRepository.remove(routine);
        return { id };
    }
}
