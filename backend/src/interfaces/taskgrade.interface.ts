import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TaskGrade {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: Number})
    student_id: number;

    @ApiProperty({type: Number})
    task_id: number;

    @ApiProperty({type: Number})
    grade_id: number;

    @ApiProperty({type: Number})
    kind_id: number;

    @ApiProperty({type: Number})
    user_id: number;

    @ApiProperty({type: String})
    notes: string;

    @ApiProperty({type: Date})
    changed: Date;
}