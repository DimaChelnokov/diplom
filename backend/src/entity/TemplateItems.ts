import { Entity, Column, ManyToOne, JoinColumn, Index, PrimaryColumn } from "typeorm";
import { task_templates } from "./TaskTemplates";
import { item_types } from "./ItemTypes";
@Entity()
export class template_items {
    @PrimaryColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    template_id: number;
    @ManyToOne(type => task_templates)
    @JoinColumn({ name: "template_id" })
    template: task_templates;

    @Index()
    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => item_types)
    @JoinColumn({ name: "type_id" })
    itemType: item_types;
}