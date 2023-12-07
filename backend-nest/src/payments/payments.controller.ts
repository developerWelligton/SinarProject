import { BadRequestException, Body, Controller ,Get,Param,Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { PaymentService } from './payments.service';
 

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


export class SaleCreateLinkPaymentDTO {
    
    billingType: string;
    chargeType: string;
    name: string;
    description: string;
    endDate: string; // ou Date, se preferir
    value: number;
    dueDateLimitDays: number;
    subscriptionCycle: string;
    maxInstallmentCount: number;
    notificationEnabled: boolean;
}


@ApiTags('Link de Pagamentos')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentService) {} // Injeção do PaymentService
  @Post('create-link')
  @ApiOperation({ summary: 'Criar um link de pagamento' })
  @ApiResponse({ status: 201, description: 'Link de pagamento criado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' }) 
  @ApiBody({
    description: 'Dados para a edição do link de pagamento',
    type: SaleCreateLinkPaymentDTO,
    examples: {
        example1: {
            summary: 'Exemplo 1', // Adiciona um resumo para o exemplo
            value: {
                name: "João Silva",
                email: "joao@gmail.com",
                loginEmail: "joao@gmail.com",
                phone: "0231231239",
                address: "Rua das Flores",
                addressNumber: "123",
                province: "São Paulo",
                postalCode: "1232345678",
                cpfCnpj: "0231231239",
                mobilePhone: "0231231239",
                city: "manaus",
                birthDate: "1970-05-24"
                // Inclua outros campos do DTO aqui, se necessário
            },
        },
        // Você pode adicionar mais exemplos aqui
    },
})
  async createPaymentLink(@Body() saleCreateLinkPaymentDTO: SaleCreateLinkPaymentDTO) {

      try {
          const result = await this.paymentService.createPaymentLink(saleCreateLinkPaymentDTO);
          return result.data;
      } catch (error) {
          throw new BadRequestException(error.message);
      }
  }


  @Get('listar-todos-links')
  @ApiOperation({ summary: 'Listar links de Pagamentos' })
  @ApiResponse({ status: 201, description: 'Foi buscada a lista Link de pagamento com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })  
  async PaymentLinksList() {

      try {
          const result = await this.paymentService.PaymentLinksList();
          return result;
      } catch (error) {
          throw new BadRequestException(error.message);
      }
  }

    @Put('editar-payment-Por-Id/:id')
    @ApiOperation({ summary: 'editar um link de pagamento' })
    @ApiResponse({ status: 201, description: 'Link de pagamento editado com sucesso.' })
    @ApiBadRequestResponse({ description: 'Requisição inválida.' })
    @ApiBody({
    description: 'Dados para a edição do link de pagamento',
    type: SaleCreateLinkPaymentDTO,
    examples: {
        example1: {
            value: {
                name: "teste"
            }
        }
    }
})
  async EditPaymentById(@Body() userEdited: SaleCreateLinkPaymentDTO, @Param('id') id: string) { 
    try {
        const result = await this.paymentService.editar_link_pagamento_id(id,userEdited )
        return result;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }


  @Get('recuperar_um_unico_link/:id')
  @ApiOperation({ summary: 'Recuperar um único link de pagamento' })
  @ApiResponse({ status: 201, description: 'Link de pagamento recuperado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
async RecuperarUmlinkPagamento(@Param('id') id: string) { 
  try {
      const result = await this.paymentService.ReperaLinkPagamentoByID(id)
      return result;
  } catch (error) {
      throw new BadRequestException(error.message);
  }
}



}
