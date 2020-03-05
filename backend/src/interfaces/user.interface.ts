import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class User {

    @ApiPropertyOptional()
    id: number;
    
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiPropertyOptional()
    roleId: number;

    @ApiPropertyOptional()
    fio: string;
}