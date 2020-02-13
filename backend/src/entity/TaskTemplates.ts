import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { task_types } from "./TaskTypes";
@Entity()
export class task_templates {
    @PrimaryColumn()
    id: number;
    
    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => task_types)
    @JoinColumn({ name: "type_id" })
    
    type: task_types;
    @Column({ unique: true })
    name: string;
}