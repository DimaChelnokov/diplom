import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AnswerType {

    @ApiProperty()
    id: number;

    @ApiProperty()
    slide_id: number;

    @ApiProperty()
    txt: string;

    @ApiProperty()
    is_correct: boolean;

    @ApiPropertyOptional()
    is_checked: boolean;
}