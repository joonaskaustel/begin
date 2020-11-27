import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TimerEntity} from '../timer/timer.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany((type) => TimerEntity, timer => timer.user)
    timers: TimerEntity[];

    @Column({ default: true })
    isActive: boolean;
}
