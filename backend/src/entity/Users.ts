import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { user_roles } from "./UserRoles";
@Entity()
export class users {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    role_id: number;
    @ManyToOne(type => user_roles)
    @JoinColumn({ name: "role_id" })
    role: user_roles;

    @Column()
    fio: string;

    @Index()
    @Column({ unique: true })
    login: string;

    @Column()
    pass: string;

    @Column()
    created: Date;

    @Column({ nullable: true })
    deleted: Date;
}

