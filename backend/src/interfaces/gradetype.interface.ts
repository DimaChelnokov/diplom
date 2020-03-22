import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GradeType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    type_id: number;

    @ApiProperty()
    name: string;
}