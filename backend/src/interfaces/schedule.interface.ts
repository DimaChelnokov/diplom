import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ScheduleType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    task: string;

    @ApiProperty()
    task_id: number;

    @ApiProperty()
    group_name: string;

    @ApiProperty()
    created_by: string;

    @ApiProperty()
    created: Date;

    @ApiProperty()
    grade: string;

    @ApiProperty()
    grade_id: number;

    @ApiProperty()
    note: string;

    @ApiProperty()
    start: number;
}