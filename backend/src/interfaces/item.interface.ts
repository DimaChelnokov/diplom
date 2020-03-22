import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ItemType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    topic_id: number;

    @ApiProperty()
    item_id: number;

    @ApiProperty()
    text: string;

    @ApiProperty()
    is_correct: boolean;
}