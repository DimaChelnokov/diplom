import { ApiProperty } from "@nestjs/swagger";

export class Item {

    @ApiProperty()
    id: number;

    @ApiProperty()
    topic_id: number;

    @ApiProperty()
    txt: string;

    @ApiProperty()
    is_correct: boolean;

    @ApiProperty()
    correct: number;
}