import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index} from "typeorm";
import { users } from "./Users";
@Entity()
export class user_log {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Column({ nullable: false })
    event_id: number;

    @Column()
    event_date: Date;

    @Column({ nullable: true })
    details: string;
}