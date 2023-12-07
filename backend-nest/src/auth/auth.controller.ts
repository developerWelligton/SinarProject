import { Controller, Post, Request, UseGuards } from '@nestjs/common';
 
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
 
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth') // Adicione a tag para a controladora AuthController
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Fazer login' })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: "wemdell@teste.com" },
        password: { type: 'string', example: 'teste' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Usuário logado com sucesso' })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

 

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
