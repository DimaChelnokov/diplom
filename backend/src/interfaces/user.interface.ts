import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class User {

    @ApiPropertyOptional()
    id: number;
    
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiPropertyOptional()
    roleId: number;

    @ApiPropertyOptional()
    fio: string;

    @ApiProperty()
    created: Date;

    @ApiPropertyOptional()
    deleted: Date;

    @ApiPropertyOptional()
    group_id: number;
}