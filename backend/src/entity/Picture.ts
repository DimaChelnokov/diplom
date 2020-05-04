import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class picture {
    @PrimaryColumn()
    internal_name: string;

    @Column()
    file_name: string;

    @Column()
    loaded: Date;
}