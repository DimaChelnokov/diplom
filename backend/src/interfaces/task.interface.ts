import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TaskType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    type_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    created_by: number;

    @ApiProperty()
    gradetype_id: number;

    @ApiProperty()
    created: Date;
}