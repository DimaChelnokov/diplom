import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { tasks } from "./Tasks";
import { rule_types } from "./RuleTypes";
import { grades } from "./Grades";
@Entity()
export class grade_rules {
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
    type_id: number;
    @ManyToOne(type => rule_types)
    @JoinColumn({ name: "type_id" })
    ruleType: rule_types;

    @Index()
    @Column({ nullable: false })
    grade_id: number;
    @ManyToOne(type => grades)
    @JoinColumn({ name: "grade_id" })
    grade: grades;

    @Column()
    total_num: number;
}