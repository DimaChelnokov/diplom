import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { tasks } from "./Tasks";
import { grades } from "./Grades";
import { users } from "./Users";
import { grade_kinds } from "./GradeKinds";
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

    @Column({ nullable: false })
    grade_id: number;
    @ManyToOne(type => grades)
    @JoinColumn({ name: "grade_id" })
    grade: grades;

    @Column({ nullable: false })
    kind_id: number;
    @ManyToOne(type => grade_kinds)
    @JoinColumn({ name: "kind_id" })
    kind: grade_kinds;

    @Index()
    @Column({ nullable: true })
    student_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "student_id" })
    studentId: users;

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