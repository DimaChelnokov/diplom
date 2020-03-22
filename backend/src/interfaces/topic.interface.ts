import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TopicType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    task_id: number;

    @ApiProperty()
    template_id: number;
}