import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TopicDetailType {

    @ApiProperty()
    id: number;

    @ApiProperty()
    task_id: number;

    @ApiProperty()
    task: string;

    @ApiPropertyOptional()
    img: string;

    @ApiPropertyOptional()
    txt: string;
}