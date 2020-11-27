export class LoginResponseDto {
    user: { email: string, firstName: string, lastName: string };
    accessToken: string;
}
