import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Routine } from './routine.entity';
import { Exercise } from './exercise.entity';
import { ActivityExercise } from './activity-exercise.entity';

@Entity('routine_exercises')
export class RoutineExercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Routine, (routine) => routine.routineExercises, { eager: false, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'routine_id' })
    routine!: Routine;

    @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises, { eager: false, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exercise_id' })
    exercise!: Exercise;

    // Posicion del ejercicio dentro de la secuencia de la rutina
    @Column({ name: 'order_index', type: 'int' })
    orderIndex!: number;

    // "target" = lo planeado, puede diferir de lo realmente hecho (actual)
    @Column({ name: 'target_sets', type: 'int', nullable: true })
    targetSets!: number;

    @Column({ name: 'target_reps', type: 'int', nullable: true })
    targetReps!: number;

    @Column({ name: 'target_weight_kg', type: 'float', nullable: true })
    targetWeightKg!: number;

    @Column({ name: 'target_duration_min', type: 'int', nullable: true })
    targetDurationMin!: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @OneToMany(() => ActivityExercise, (activityExercise) => activityExercise.routineExercise)
    activityExercises!: ActivityExercise[];
}
