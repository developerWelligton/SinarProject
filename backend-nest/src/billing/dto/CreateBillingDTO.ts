export class CreateBillingDTO {
  readonly billingType: string; // Forma de pagamento
  readonly customer: string; // Identificador único do cliente
  readonly value: number; // Valor da cobrança
  readonly dueDate: string; // Data de vencimento da cobrança
  readonly description?: string; // Descrição da cobrança (opcional)
  readonly externalReference?: string; // Campo livre para busca (opcional)
  readonly installmentCount?: number; // Número de parcelas (opcional)
  readonly totalValue?: number; // Valor total da cobrança parcelada (opcional)
  readonly installmentValue?: number; // Valor de cada parcela (opcional)
    
  }
