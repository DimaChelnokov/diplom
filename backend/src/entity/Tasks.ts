import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { task_types } from "./TaskTypes";
import { grade_types } from "./GradeTypes";
import { users } from "./Users";
import { groups } from "./Groups";
@Entity()
export class tasks {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    created_by: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "created_by" })
    createdBy: users;

    @Column({ nullable: false })
    gradetype_id: number;
    @ManyToOne(type => grade_types)
    @JoinColumn({ name: "gradetype_id" })
    gradetype: grade_types;

    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => task_types)
    @JoinColumn({ name: "type_id" })
    type: task_types;

    @Column()
    name: string;

    @Column()
    created: Date;
}