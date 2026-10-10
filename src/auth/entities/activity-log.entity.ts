import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';
import { Routine } from './routine.entity';
import { ActivityExercise } from './activity-exercise.entity';

@Entity('activity_logs')
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.activityLogs, { eager: false, nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Routine, (routine) => routine.activityLogs, { eager: false, nullable: false })
    @JoinColumn({ name: 'routine_id' })
    routine!: Routine;

    @Column({ name: 'started_at', type: 'timestamp' })
    startedAt!: Date;

    // null mientras la sesion sigue en curso
    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt!: Date;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @OneToMany(() => ActivityExercise, (activityExercise) => activityExercise.activityLog, { cascade: true })
    activityExercises!: ActivityExercise[];
}
