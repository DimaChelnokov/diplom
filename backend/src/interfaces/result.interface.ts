import { ApiProperty } from "@nestjs/swagger";

export class ResultType {

    @ApiProperty()
    student_id: number;

    @ApiProperty()
    task_id: number;

    @ApiProperty()
    item_id: number;

    @ApiProperty()
    is_checked: boolean;

    @ApiProperty()
    checked: Date;
}
