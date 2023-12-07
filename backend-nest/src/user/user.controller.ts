import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';


import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user') // Adicione a tag para a controladora AuthController
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
   
  ) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiBody({
    description: 'Dados para a criação de um novo usuário',
    type: CreateUserDto,
    examples: {
      normalUser: {
        summary: 'Exemplo de usuário normal',
        value: {
          name: 'John Doe',
          email: 'email@teste.com',
          cpfCnpj: '283.252.254-79',
          password: 'password123',
          role: 'cliente'
        }
      },
    }
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
 
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


}
