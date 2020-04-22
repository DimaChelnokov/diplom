import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { students } from "./Students";
import { task_items } from "./TaskItems";

@Entity()
export class answer {
    @PrimaryColumn()
    student_id: number;
    @ManyToOne(type => students)
    @JoinColumn({ name: "student_id" })
    students: students;

    @PrimaryColumn()
    item_id: number;
    @ManyToOne(type => task_items)
    @JoinColumn({ name: "item_id" })
    items: task_items;

    @Column()
    checked: Date;
}