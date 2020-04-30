import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { answer } from '../entity/Answer';
import { Repository } from 'typeorm';
import { ResultType } from '../interfaces/result.interface';
import { answerProviders } from './answer.providers';
import { task_grade } from '../entity/TaskGrade';

@Injectable()
export class AnswerService {

    constructor(
        @Inject('ANSWER_REPOSITORY')
        private readonly service: Repository<answer>,
    ) {}  

    async getStudent(id: number): Promise<number> {
        const x = await this.service.query(
            `select a.id as id
             from   students a
             where  now() > a.created and now() <= coalesce(a.deleted, now())
             and    a.user_id = $1`, [id]);
        if (!x || x.length != 1) {
            return null;
        }
        return x[0].id;
    }

    async getResults(id: number, task: number): Promise<ResultType[]> {
        try {
            let student = await this.getStudent(id);
            if (!student) {
                return null;
            }
            const x = await this.service.query(
                `select c.student_id as student_id, a.task_id as task_id, 
                        b.id as item_id, c.checked as checked
                 from   task_topics a
                 inner  join task_items b on (b.topic_id = a.id)
                 inner  join answer c on (c.item_id = b.id and c.student_id = $1)
                 where  a.id = $2`, [student, task]);
                 let list: ResultType[] = x.map(x => {
                     let it = new ResultType();
                     it.student_id = x.student_id;
                     it.task_id = x.task_id;
                     it.item_id = x.item_id;
                     if (x.checked) {
                         it.is_checked = true;
                     } else {
                         it.is_checked = false;
                     }
                     it.checked = x.checked;
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

    async getResultsByStudent(student: number, task: number): Promise<ResultType[]> {
        try {
            const x = await this.service.query(
                `select c.student_id as student_id, a.task_id as task_id, 
                        b.id as item_id, c.checked as checked
                 from   task_topics a
                 inner  join task_items b on (b.topic_id = a.id)
                 inner  join answer c on (c.item_id = b.id and c.student_id = $1)
                 where  a.id = $2`, [student, task]);
                 let list: ResultType[] = x.map(x => {
                     let it = new ResultType();
                     it.student_id = x.student_id;
                     it.task_id = x.task_id;
                     it.item_id = x.item_id;
                     if (x.checked) {
                         it.is_checked = true;
                     } else {
                         it.is_checked = false;
                     }
                     it.checked = x.checked;
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

    async touchGrade(student: number, task: number): Promise<boolean> {
        const x = await this.service.query(
            `select a.id
             from   task_grade a
             where  a.student_id = $1 and a.task_id = $2`, [student, task]);
        if (x && x.length == 1) {
            return false;
        }
        const y = await this.service.createQueryBuilder("task_grade")
        .insert()
        .into(task_grade)
        .values({
            student_id: student,
            task_id: task,
            changed: new Date()
        })
        .execute();
        return true;
    }

    async setResult(id: number, item: number, checked: boolean): Promise<ResultType> {
        try { 
            let student = await this.getStudent(id);
            if (!student) {
                return null;
            }
            let it = new ResultType();
            it.student_id = student;
            it.item_id = item;
            it.is_checked = checked;
            it.checked = new Date();
            const x = await this.service.query(
                `select b.task_id as task_id, c.item_id as item_id
                 from   task_items a
                 inner  join task_topics b on (b.id = a.topic_id)
                 left   join answer c on (c.item_id = a.id and c.student_id = $1)
                 where  a.id = $2`, [student, item]);
            if (!x || x.length != 1) {
                return null;
            }
            it.task_id = x[0].task_id;
            await this.touchGrade(student, it.task_id);
            if (checked) {
                if (!x[0].item_id) {
                    const y = await this.service.createQueryBuilder("answer")
                    .insert()
                    .into(answer)
                    .values({
                        student_id: student,
                        item_id: item,
                        checked: new Date() 
                    })
                    .execute();
                }
            } else {
                await this.service.createQueryBuilder("answer")
                .delete()
                .from(answer)
                .where("answer.student_id = :student_id and answer.item_id = :item_id", {student_id: student, item_id: item})
                .execute();
            }
            return it;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
}
