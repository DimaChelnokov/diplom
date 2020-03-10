import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GradeRules {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: Number})
    task_id: number;

    @ApiProperty({type: Number})
    type_id: number;

    @ApiProperty({type: Number})
    grade_id: number;

    @ApiProperty({type: Number})
    total_num: number;
}