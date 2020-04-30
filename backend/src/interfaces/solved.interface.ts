import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SolvedType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    task: string;

    @ApiProperty()
    task_id: number;

    @ApiProperty()
    group_name: string;

    @ApiProperty()
    solved_by: string;

    @ApiProperty()
    student_id: number;

    @ApiProperty()
    solved: Date;

    @ApiProperty()
    start: number;

    @ApiProperty()
    note: string;
}