/* 소셜 로그인 을 위해 
rest API 로 만들어진 controller
*/
import { User } from 'src/apis/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnprocessableEntityException,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserService } from '../users/user.service';
import { LoginInputDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

interface IOauthUser {
    user: Pick<User, 'email' | 'password' | 'name'>;
}

@Controller()
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post('/login/nomal')
    async loginPost(
        @Body() { email, password }: LoginInputDto,
        // @Body('email') email: string,
        // @Body('password') password: string,
        @Res() res: Response,
    ) {
        // 1.로그인
        const user = await this.userService.findOne({ email });

        //2. 없으면 에러
        if (!user) throw new UnprocessableEntityException('이메일이 없습니다');
        // 3. 아이디 유 비밀번호가 틀림 에러
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new UnprocessableEntityException('비밀번호가 틀립니다');

        // 4. refreshToken(=JWT) 을 만들어서 프론트 엔드 쿠키에 보내주기
        await this.authService.setRefreshToken({ user, res });
        // 5. 일치하는 유저 있으면 토큰 발행
        const result = await this.authService.getAccessToken({ user });
        res.send(result);
        return;
    }

    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    async loginGoogle(@Req() req: Request & IOauthUser, @Res() res: Response) {
        return await this.authService.loginOauth({ req, res });
    }

    @Get('/login/naver')
    @UseGuards(AuthGuard('naver'))
    async loginNaver(@Req() req: Request & IOauthUser, @Res() res: Response) {
        return await this.authService.loginOauth({ req, res });
    }

    @Get('/login/kakao')
    @UseGuards(AuthGuard('kakao'))
    async loginKakao(@Req() req: Request & IOauthUser, @Res() res: Response) {
        return await this.authService.loginOauth({ req, res });
    }
}
