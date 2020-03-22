import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GradeRules {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    task_id: number;

    @ApiProperty()
    type_id: number;

    @ApiProperty()
    grade_id: number;

    @ApiProperty()
    total_num: number;
}