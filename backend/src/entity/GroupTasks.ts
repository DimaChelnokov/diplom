import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { tasks } from "./Tasks";
import { groups } from "./Groups";
import { users } from "./Users";
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

    @Index()
    @Column({ nullable: false })
    created_by: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "created_by" })
    user: users;

    @Column()
    created: Date;
}