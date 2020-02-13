import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class groups {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date_from: Date;
    
    @Column({ nullable: true })
    date_to: Date;
}