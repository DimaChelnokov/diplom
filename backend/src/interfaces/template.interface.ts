import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TemplateType {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: Number})
    type_id: number;

    @ApiProperty({type: String})
    name: string;
}