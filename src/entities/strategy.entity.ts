import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('strategy')
export class Strategy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    // tslint:disable-next-line
    data_source_name: string;
}
