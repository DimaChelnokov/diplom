import { Entity, Column, PrimaryColumn } from "typeorm";
@Entity()
export class grade_types {
    @PrimaryColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;
}