import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from '../user/user.entity';

@Entity()
export class TimerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    start: Date;

    @Column({ nullable: true })
    end: Date;

    @ManyToOne((type) => UserEntity, user => user.timers)
    user: UserEntity;
}
