import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GroupType {
    
    @ApiPropertyOptional()
    id: number;
    
    @ApiProperty()
    name: string;

    created: Date;

    @ApiPropertyOptional()
    deleted: Date;
}