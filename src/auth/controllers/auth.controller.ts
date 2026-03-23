import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from './../entities/usuariologin.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller("/usuarios")
//n precisa do piBearerAuth() pq o único endpoint desta classe (/logar) é um endpoint liberado, não necessita de um token.
export class AuthController {
    constructor(private authService: AuthService) { }

    //end point de login,onde o usuário irá enviar as credenciais para autenticação
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }    //passa o usuario e login

}