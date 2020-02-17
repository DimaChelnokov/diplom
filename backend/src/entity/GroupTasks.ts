import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { tasks } from "./Tasks";
import { groups } from "./Groups";
@Entity()
export class group_tasks {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    task_id: number;
    @ManyToOne(type => tasks)
    @JoinColumn({ name: "task_id" })
    task: tasks;

    @Index()
    @Column({ nullable: false })
    group_id: number;
    @ManyToOne(type => groups)
    @JoinColumn({ name: "group_id" })
    group: groups;

    @Column()
    created: Date;

    @Column()
    scheduled: Date;
}