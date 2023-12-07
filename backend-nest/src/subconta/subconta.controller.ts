import { SubContaService } from './subconta.service';
import { BadRequestException, Body, Controller ,Get,Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { CreateSubAccountDTO } from './model/CreateSubAccountDTO';

 
 

@ApiTags('subcontas')
@Controller('subconta')
export class SubContaController {
  constructor(private subContaService: SubContaService) {} // Injeção do PaymentService

  
  @Post('create-account')
  @ApiOperation({ summary: 'Criar uma subconta' })
  @ApiResponse({ status: 201, description: 'Conta criada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' }) 
  @ApiBody({
    description: 'Dados para a edição do link de pagamento',
    type: CreateSubAccountDTO,
    examples: {
        example1: {
            summary: 'Criar sub-conta', // Adiciona um resumo para o exemplo
            value: {
                "name": "joão Costa",
                "email": "joão@gmail.com",
                "loginEmail": "joão@gmail.com",
                "phone": "92993188317",
                "address": "Rua das Flores",
                "addressNumber": "123",
                "province": "São Paulo",
                "postalCode": "27949316",
                "cpfCnpj": "41623339049",
                "mobilePhone": "92993188317",
                "city": 13660,
                "state": "AM",
                "birthDate": "1970-05-24"
                // Inclua outros campos do DTO aqui, se necessário
            },
        },
        // Você pode adicionar mais exemplos aqui
    },
})
  async createAccount(@Body() createSubAccountDTO: CreateSubAccountDTO) {
      try {
          const result = await this.subContaService.createSubAccount(createSubAccountDTO);
          return result.data;
      } catch (error) {
          throw new BadRequestException(error.message);
      }
  }


  @Get('list-account')
  @ApiOperation({ summary: 'Lista de Subconta' })
  @ApiResponse({ status: 200, description: 'Conta listada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  async listSubAccount(
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    try {
      return await this.subContaService.listSubAccount(offset, limit);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
 
  
}
