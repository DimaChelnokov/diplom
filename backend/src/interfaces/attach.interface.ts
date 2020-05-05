import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class AttachType {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    group_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    date_from: Date;

    @ApiPropertyOptional()
    task_id: number;
}
