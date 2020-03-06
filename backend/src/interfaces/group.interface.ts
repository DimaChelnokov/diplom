import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GroupType {
    
    @ApiPropertyOptional({type: Number})
    id: number;
    
    @ApiProperty({type: String})
    name: string;

    @ApiProperty({type: Date})
    created: Date;

    @ApiPropertyOptional({type: Date})
    deleted: Date;
}