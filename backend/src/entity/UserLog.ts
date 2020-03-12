import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index} from "typeorm";
import { users } from "./Users";
import { event_types } from "./EventTypes";
import { object_types } from "./ObjectTypes";
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

    @Index()
    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => object_types)
    @JoinColumn({ name: "type_id" })
    type: users;

    @Index()
    @Column({ nullable: false })
    event_id: number;
    @ManyToOne(type => event_types)
    @JoinColumn({ name: "event_id" })
    event: event_types;

    @Column()
    event_date: Date;

    @Column({ nullable: true })
    url: string;

    @Column({ nullable: true })
    body: string;

    @Column()
    result_code: number;
}