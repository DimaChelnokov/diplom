import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { users } from "./Users";
import { detail_statuses } from "./DetailStatuses";
@Entity()
export class user_details {
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
    status_id: number;
    @ManyToOne(type => detail_statuses)
    @JoinColumn({ name: "status_id" })
    status: detail_statuses;

    @Column()
    email: string;

    @Column()
    date_from: Date;

    @Column({ nullable: true })
    date_to: Date;
}