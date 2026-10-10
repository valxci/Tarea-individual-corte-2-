import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';
import { RoutineExercise } from './routine-exercise.entity';
import { ActivityLog } from './activity-log.entity';

@Entity('routines')
export class Routine {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.routines, { eager: false, nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ length: 100 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    // Se actualiza sola en cada save()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    // cascade permite guardar la rutina y sus ejercicios en una sola operacion
    @OneToMany(() => RoutineExercise, (routineExercise) => routineExercise.routine, { cascade: true })
    routineExercises!: RoutineExercise[];

    @OneToMany(() => ActivityLog, (activityLog) => activityLog.routine)
    activityLogs!: ActivityLog[];
}
