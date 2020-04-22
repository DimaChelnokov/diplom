import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { users } from "./Users";

@Entity()
export class picture {
    @PrimaryColumn()
    internal_name: string;

    @Column()
    file_name: string;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Column()
    loaded: Date;
}