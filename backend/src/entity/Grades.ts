import { Entity, Column, ManyToOne, JoinColumn, Index, PrimaryColumn } from "typeorm";
import { grade_types } from "./GradeTypes";
@Entity()
export class grades {
    @PrimaryColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => grade_types)
    @JoinColumn({ name: "type_id" })
    type: grade_types;

    @Column({ unique: true })
    name: string;
}