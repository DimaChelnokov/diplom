import {Entity, Column, PrimaryColumn} from "typeorm";
@Entity()
export class user_roles {
    @PrimaryColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;
}