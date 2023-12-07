import { BadRequestException, Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
 
import { CreateBillingDTO } from './dto/CreateBillingDTO';
import { BillingService } from './billing.service';

@ApiTags('Cobranças')
@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {} // Inject the BillingService

  @Post('create-billing') 
  @ApiOperation({ summary: 'Criar uma Cobrança' }) 
  @ApiResponse({ status: 201, description: 'Cobrança criada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' }) 
  @ApiBody({
    description: 'Dados para a edição do link de pagamento',
    type: CreateBillingDTO,
    examples: {
        example1: {
            summary: 'Criar sub-conta', // Adiciona um resumo para o exemplo
            value:   {
              "billingType": "PIX",
              "customer": "1",
              "value": 100.00,
              "dueDate": "2024-01-01",
              "description": "Example billing description",
              "externalReference": "Ref123",
              "installmentCount": 3,
              "totalValue": 300.00,
              "installmentValue": 100.00
            }
            ,
        },
        // Você pode adicionar mais exemplos aqui
    },
})
  async createBilling(@Body() createBillingDTO: CreateBillingDTO) { 
    try {
        const result = await this.billingService.createBilling(createBillingDTO);
        return result;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }

 
  @Get(':id')
  @ApiOperation({ summary: 'Buscar Cobrança por ID' })
  @ApiResponse({ status: 200, description: 'Cobrança encontrada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  async getBillingById(@Param('id') id: string) {
      try {
          const billing = await this.billingService.getBillingById(id);
          return billing;
      } catch (error) {
          throw new BadRequestException(error.message);
      }
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as Cobranças' })
  @ApiResponse({ status: 200, description: 'Cobranças listadas com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  async getAllBillings() {
      try {
          const billings = await this.billingService.getAllBillings();
          return billings;
      } catch (error) {
          throw new BadRequestException(error.message);
      }
  }

@Put(':id')
  @ApiOperation({ summary: 'Atualizar uma Cobrança' })
  @ApiResponse({ status: 200, description: 'Cobrança atualizada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  async updateBilling(@Param('id') id: string, @Body() updateBillingDTO: CreateBillingDTO) {
    try {
      const updatedBilling = await this.billingService.updateBilling(id, updateBillingDTO);
      return updatedBilling;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma Cobrança' })
  @ApiResponse({ status: 200, description: 'Cobrança deletada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  async deleteBilling(@Param('id') id: string) {
    try {
      await this.billingService.deleteBilling(id);
      return { message: 'Cobrança deletada com sucesso.' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


}
