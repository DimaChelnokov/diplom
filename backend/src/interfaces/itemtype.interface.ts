import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ItemtypeType {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: String})
    name: string;
}