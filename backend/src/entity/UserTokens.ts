import { Entity, PrimaryGeneratedColumn, Index, Column, ManyToOne, JoinColumn } from "typeorm";
import { token_types } from "./TokenTypes";
import { users } from "./Users";

@Entity()
export class tokens {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => token_types)
    @JoinColumn({ name: "type_id" })
    type: token_types;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Column({ type: "varchar", length: 100 })
    device_str: string;

    @Column({ type: "text" })
    value_str: string;

    @Column({default: () => "now()"})
    created: Date;
}