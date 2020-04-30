import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SlideType {

    @ApiProperty()
    id: number;

    @ApiProperty()
    task: string;

    @ApiProperty()
    task_id: number;

    @ApiPropertyOptional()
    img: string;

    @ApiPropertyOptional()
    txt: string;

    @ApiProperty()
    is_radio: boolean;

    @ApiPropertyOptional()
    next: number;

    @ApiPropertyOptional()
    prev: number;

    @ApiProperty()
    gradetype_id: number;
    
    @ApiPropertyOptional()
    grade_id: number;
}