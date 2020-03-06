import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ItemType {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: Number})
    topic_id: number;

    @ApiProperty({type: Number})
    item_id: number;

    @ApiProperty({type: String})
    text: string;

    @ApiProperty({type: Boolean})
    is_correct: boolean;
}