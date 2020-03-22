import { ApiProperty } from "@nestjs/swagger";

export class UserLog {

    @ApiProperty()
    event_date: Date;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    event_id: number;

    @ApiProperty()
    type_id: number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    body: JSON;

    @ApiProperty()
    result_code: number;
}
