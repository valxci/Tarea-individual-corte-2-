import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Routine } from '../../auth/entities/routine.entity';
import { User } from '../../auth/entities/user.entity';

import { RoutineService } from './routine.service';
import { RoutineController } from './routine.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Routine, User])],
    controllers: [RoutineController],
    providers: [RoutineService],
    exports: [RoutineService],
})
export class RoutineModule {}
