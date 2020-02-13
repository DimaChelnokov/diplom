import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { tasks } from "./Tasks";
import { task_templates } from "./TaskTemplates";
@Entity()
export class task_topics {
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
    template_id: number;
    @ManyToOne(type => task_templates)
    @JoinColumn({ name: "template_id" })
    template: task_templates;

    @Column()
    order_num: number;
}