import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TaskGrade {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    student_id: number;

    @ApiProperty()
    task_id: number;

    @ApiProperty()
    grade_id: number;

    @ApiProperty()
    kind_id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    notes: string;

    @ApiProperty()
    changed: Date;
}