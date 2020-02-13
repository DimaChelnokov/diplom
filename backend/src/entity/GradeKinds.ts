import { Entity, Column, PrimaryColumn } from "typeorm";
@Entity()
export class grade_kinds {
    @PrimaryColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;
}