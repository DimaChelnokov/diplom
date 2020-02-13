import { Entity, Column, PrimaryColumn } from "typeorm";
@Entity()
export class task_types {
    @PrimaryColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;
}