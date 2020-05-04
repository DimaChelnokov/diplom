import { ApiProperty } from "@nestjs/swagger";

export class TopicType {

    @ApiProperty()
    id: number;

    @ApiProperty()
    task_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    is_radio: boolean;
}