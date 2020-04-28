import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { ScheduleType } from '../interfaces/schedule.interface';
import { group_tasks } from '../entity/GroupTasks';
import { SlideType } from '../interfaces/slide.interface';
import { AnswerType } from '../interfaces/answer.interface';

@Injectable()
export class SchedulesService {

    constructor(
        @Inject('SCHED_REPOSITORY')
        private readonly service: Repository<group_tasks>,
    ) {}  

    async getSchedules(student: number): Promise<ScheduleType[]> {
        try {
            const x = await this.service.query(
               `select a.id as id, a.created as created, a.task_id as task_id, b.name as task, c.name as group_name, 
                       g.name as grade, d.fio as created_by, f.grade_id as grade_id, f.note as note,
                      (select min(id) from task_topics h where h.task_id = b.id) as start
                from   group_tasks a
                inner  join tasks b on (b.id = a.task_id and now() > b.created and now() <= coalesce(b.deleted, now())) 
                inner  join groups c on (c.id = a.group_id) 
                inner  join users d on (d.id = a.created_by) 
                inner  join students e on (e.group_id = c.id and now() > e.created and now() <= coalesce(e.deleted, now())) 
                left   join task_grade f on (f.task_id = b.id and f.student_id = e.id) 
                left   join grades g on (g.id = f.grade_id)
                where  e.user_id = $1 
                order by a.created desc`, [student]);
                let list: ScheduleType[] = x.map(x => {
                    let it = new ScheduleType();
                    it.id = x.id;
                    it.created = x.created;
                    it.task_id = x.task_id;
                    it.task = x.task;
                    it.group_name = x.group_name;
                    it.created_by = x.created_by;
                    it.grade = x.grade;
                    it.grade_id = x.grade_id;
                    it.note = x.note;
                    it.created_by = x.created_by;
                    it.start = x.start;
                    return it;
                });
                return list;
            } catch (error) {
                console.error(error);
                throw new InternalServerErrorException({
                    status: HttpStatus.BAD_REQUEST,
                    error: error
                });
            }
    }

    async getSlide(id: number): Promise<SlideType> {
        try {
            const x = await this.service.query(
                `select a.id as id, a.task_id as task_id, b.name as task, c.txt as img, d.txt as txt, a.is_radio as is_radio,
                (select min(e.id) from task_topics e where e.task_id = a.task_id and e.id > a.id) as next,
                (select max(f.id) from task_topics f where f.task_id = a.task_id and f.id < a.id) as prev
                 from   task_topics a
                 inner  join tasks b on (b.id = a.task_id)
                 left   join task_items c on (c.topic_id = a.id and c.item_id = 1)
                 left   join task_items d on (d.topic_id = a.id and d.item_id = 2)
                 where  a.id = $1`, [id]);
            if (!x || x.length != 1) {
                return null;
            }
            let it = new SlideType();
            it.id = x[0].id;
            it.task = x[0].task;
            it.task_id = x[0].task_id;
            it.img = x[0].img;
            it.txt = x[0].txt;
            it.is_radio = x[0].is_radio;
            it.next = x[0].next;
            it.prev = x[0].prev;
            return it;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async getAnswers(id: number): Promise<AnswerType[]> {
        try {
            const x = await this.service.query(
                `select a.id as id, a.topic_id as slide_id, a.txt as txt, a.is_correct as is_correct
                 from   task_items a
                 where  a.item_id = 3 and a.topic_id = $1
                 order  by a.id`, [id]);
            let list: AnswerType[] = x.map(x => {
                let it = new AnswerType();
                it.id = x.id;
                it.slide_id = x.slide_id;
                it.txt = x.txt;
                it.is_correct = x.is_correct;
                return it;
            });
            return list;
    } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
}
