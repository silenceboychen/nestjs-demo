import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({
        default: 1,
    })
    status: number;

    @Column()
    // tslint:disable-next-line
    login_time: number;
}
