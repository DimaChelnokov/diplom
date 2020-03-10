import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GradeType {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: Number})
    type_id: number;

    @ApiProperty({type: String})
    name: string;
}