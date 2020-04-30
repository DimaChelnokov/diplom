import { ApiPropertyOptional } from "@nestjs/swagger";

export class TaskGrade {

    @ApiPropertyOptional()
    student_id: number;

    @ApiPropertyOptional()
    task_id: number;

    @ApiPropertyOptional()
    grade_id: number;

    @ApiPropertyOptional()
    note: string;
}