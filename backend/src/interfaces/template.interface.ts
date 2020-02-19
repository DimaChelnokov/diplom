import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TemplateType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    type_id: number;

    @ApiProperty()
    name: string;
}