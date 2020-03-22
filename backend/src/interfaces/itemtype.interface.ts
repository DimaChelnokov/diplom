import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ItemtypeType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    name: string;
}