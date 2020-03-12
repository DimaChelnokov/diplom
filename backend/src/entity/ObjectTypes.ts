import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class object_types {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
