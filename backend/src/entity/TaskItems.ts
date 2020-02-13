import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { task_topics } from "./TaskTopics";
import { template_items } from "./TemplateItems";
@Entity()
export class task_items {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    topic_id: number;
    @ManyToOne(type => task_topics)
    @JoinColumn({ name: "topic_id" })
    topic: task_topics;

    @Index()
    @Column({ nullable: false })
    item_id: number;
    @ManyToOne(type => template_items)
    @JoinColumn({ name: "item_id" })
    item: template_items;

    @Column({ nullable: true })
    txt: string;

    @Column()
    is_correct: boolean;

    @Column()
    order_num: number;
}