import { ApiProperty } from "@nestjs/swagger";

export class UserLog {

    @ApiProperty({type: Date})
    event_date: Date;

    @ApiProperty({type: Number})
    user_id: number;

    @ApiProperty({type: Number})
    event_id: number;

    @ApiProperty({type: Number})
    type_id: number;

    @ApiProperty({type: String})
    url: string;

    @ApiProperty({type: JSON})
    body: JSON;

    @ApiProperty({type: Number})
    result_code: number;
}
