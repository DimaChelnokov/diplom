import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Type {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    name: string;
}