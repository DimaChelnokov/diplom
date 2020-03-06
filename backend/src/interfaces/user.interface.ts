import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class User {

    @ApiPropertyOptional({type: Number})
    id: number;
    
    @ApiProperty({type: String})
    username: string;

    @ApiProperty({type: String})
    password: string;

    @ApiPropertyOptional({type: Number})
    roleId: number;

    @ApiPropertyOptional({type: String})
    fio: string;
}