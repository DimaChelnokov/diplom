import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TopicType {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: Number})
    task_id: number;

    @ApiProperty({type: Number})
    template_id: number;
}