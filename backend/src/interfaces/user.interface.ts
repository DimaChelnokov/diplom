import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class User {

    @ApiPropertyOptional({type: Number})
    id: number;
    
    @ApiProperty({type: String})
    username: string;

    @ApiProperty({type: String})
    password: string;

    @ApiProperty({type: String})
    email: string;

    @ApiPropertyOptional({type: Number})
    roleId: number;

    @ApiPropertyOptional({type: String})
    fio: string;

    @ApiProperty({type: Date})
    created: Date;

    @ApiPropertyOptional({type: Date})
    deleted: Date;

    @ApiPropertyOptional({type: Number})
    group_id: number;
}