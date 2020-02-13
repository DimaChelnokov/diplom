import { Entity, Column, PrimaryColumn } from "typeorm";
@Entity()
export class detail_statuses {
    @PrimaryColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;
}