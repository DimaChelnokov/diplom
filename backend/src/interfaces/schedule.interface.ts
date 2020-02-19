import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ScheduleType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    task_id: number;

    @ApiProperty()
    group_id: number;

    created: Date;
}