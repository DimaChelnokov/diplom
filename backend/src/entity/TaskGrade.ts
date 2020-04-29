import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { tasks } from "./Tasks";
import { grades } from "./Grades";
import { users } from "./Users";
import { students } from "./Students";
@Entity()
export class task_grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    task_id: number;
    @ManyToOne(type => tasks)
    @JoinColumn({ name: "task_id" })
    task: tasks;

    @Column({ nullable: true })
    grade_id: number;
    @ManyToOne(type => grades)
    @JoinColumn({ name: "grade_id" })
    grade: grades;

    @Index()
    @Column({ nullable: true })
    student_id: number;
    @ManyToOne(type => students)
    @JoinColumn({ name: "student_id" })
    studentId: students;

    @Index()
    @Column({ nullable: true })
    graded_by: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "graded_by" })
    gradedBy: users;

    @Column({ nullable: true })
    note: string;

    @Column()
    changed: Date;
}