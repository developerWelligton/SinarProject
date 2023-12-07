import { BadRequestException, Body, Controller ,Post,Get, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { ClientsService } from './Clients.Service';
 

export class CreateUserDTO {
  readonly name: string;
  readonly cpfCnpj: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly addressNumber: string;
  readonly province: string;
  readonly postalCode: string;
  readonly mobilePhone: string;
  readonly complement: string;
  readonly externalReference: string;
  readonly notificationDisabled: boolean;
  readonly additionalEmails: string;
  readonly stateInscription: string;
  readonly municipalInscription: string;
  readonly observations: string;
}
 



@ApiTags('Clientes')
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {} // Injeção do PaymentService
 

  @Post('create-client') 
  @ApiOperation({ summary: 'Criar um Cliente' }) 
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' }) 
  @ApiBody({
    description: 'Dados para a criacao do Cliente',
    type: CreateUserDTO,
    examples: {
        example1: {
            summary: 'Exemplo 1', // Adiciona um resumo para o exemplo
            value: {
                name: "Cliente",
                // Inclua outros campos do DTO aqui, se necessário
            },
        },
        // Você pode adicionar mais exemplos aqui
    },
})
  async createCliente(@Body() createUserDTO: CreateUserDTO) { 
    try {
        const result = await this.clientsService.createCliente(createUserDTO);
        return result;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
}


@Get()
@ApiOperation({ summary: 'Lista de Clientes' })
@ApiResponse({ status: 200, description: 'Clientes listados com sucesso.' })
@ApiBadRequestResponse({ description: 'Requisição inválida.' })
async listClientes() {
  try {
    const clients = await this.clientsService.findAll();
    return clients;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}

 
  @Get('buscar-cliente-por-id/:id')
  @ApiOperation({ summary: 'Buscar Cliente Por ID' }) 
  async getClienteById(@Param('id') id: string) { 
    try {
        const result = await this.clientsService.getClientByID(id);
        return result;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }

  @Put('editar-cliente-por-Id/:id')
  @ApiResponse({ status: 201, description: 'Cliente editado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' }) 
  @ApiBody({
    description: 'Dados para a editar Cliente',
    type: CreateUserDTO,
    examples: {
        example1: {
            summary: 'Exemplo 1', // Adiciona um resumo para o exemplo
            value: {
                name: "Nome Editado Teste", 
            },
        },
        // Você pode adicionar mais exemplos aqui
    },
})
  @ApiOperation({ summary: 'Editar Cliente Por ID' }) 
  async EditClienteById(@Body() userEdited: CreateUserDTO, @Param('id') id: string) { 
    try {
        const result = await this.clientsService.EditClientByID(id, userEdited)
        return result;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }


  @Delete('deletar-cliente-por-id/:id')
  @ApiOperation({ summary: 'Deletar Cliente Por ID' }) 
  async DeleteClienteById(@Param('id') id: string) { 
    try {
        const result = await this.clientsService.DeleteClientByID(id)
        return result;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }

  @Post('restaurar-cliente-deletado-Por-Id/:id')
  @ApiOperation({ summary: 'Restaura Cliente Deletado Por ID' }) 
  async RestoreClienteById(@Param('id') id: string) { 
    try {
        const result = await this.clientsService.RestoreClientByID(id)
        return result;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }


}
