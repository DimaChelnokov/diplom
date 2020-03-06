import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ScheduleType {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: Number})
    task_id: number;

    @ApiProperty({type: Number})
    group_id: number;

    @ApiProperty({type: Date})
    created: Date;
}