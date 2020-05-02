import { ApiProperty } from "@nestjs/swagger";

export class TaskType {

    @ApiProperty()
    id: number;

    @ApiProperty()
    type_id: number;

    @ApiProperty()
    created: Date;

    @ApiProperty()
    created_by: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    gradetype: string;

    @ApiProperty()
    groups: string;
}