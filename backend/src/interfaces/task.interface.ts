import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TaskType {

    @ApiPropertyOptional({type: Number})
    id: number;

    @ApiProperty({type: Number})
    type_id: number;

    @ApiProperty({type: String})
    name: string;

    @ApiProperty({type: Number})
    created_by: number;

    @ApiProperty({type: Number})
    gradetype_id: number;

    @ApiProperty({type: Date})
    created: Date;
}