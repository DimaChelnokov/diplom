import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { users } from "./Users";
import { groups } from "./Groups";
@Entity()
export class students {
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
    group_id: number;
    @ManyToOne(type => groups)
    @JoinColumn({ name: "group_id" })
    group: users;

    @Column()
    created: Date;
    
    @Column({ nullable: true })
    deleted: Date;
}