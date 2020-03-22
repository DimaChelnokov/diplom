import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GroupType {
    
    @ApiPropertyOptional()
    id: number;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    created: Date;

    @ApiPropertyOptional()
    deleted: Date;
}