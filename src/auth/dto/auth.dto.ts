// dto/refresh-token.dto.ts
import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
    @IsNotEmpty()
    @IsJWT()
    refreshToken!: string;
}