import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Type {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: String})
    name: string;
}