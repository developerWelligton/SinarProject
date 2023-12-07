import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreateBillingDTO } from './dto/CreateBillingDTO';

@Injectable()
export class BillingService {
    private httpClient: AxiosInstance;

    constructor() {
      this.httpClient = axios.create({
          baseURL: 'https://api.asaas.com/v3/', // Base URL da API
          headers: {
              'Accept-Encoding': 'gzip, deflate, br',
              'Accept': '*/*',
              'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAzMjU0NDM6OiRhYWNoX2ZhZDVmN2JjLTI1ODYtNDg2NS1hYzIxLWExNjNhNmUyYTA0Yg==', // Coloque seu token de acesso aqui
          },
      });
  }


    async createBilling(createBillingDTO: CreateBillingDTO): Promise<any> {
        try {
            // Construct the payload based on the DTO
            const payload = {
              billingType: createBillingDTO.billingType,
              customer: createBillingDTO.customer,
              value: createBillingDTO.value,
              dueDate: createBillingDTO.dueDate,
              description: createBillingDTO.description,
              externalReference: createBillingDTO.externalReference,
              installmentCount: createBillingDTO.installmentCount,
              totalValue: createBillingDTO.totalValue,
              installmentValue: createBillingDTO.installmentValue
          };

            const response = await this.httpClient.post('payments', payload); // Replace 'billing-endpoint' with your actual endpoint
            return response.data;
        } catch (error) {
            this.handleAxiosError(error);
        }
    }

    // Include other methods for retrieving, updating, and deleting billings as needed

    private handleAxiosError(error: any) {
        if (error.response) {
            // A API respondeu com um status fora do intervalo 2xx
            console.error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            throw new BadRequestException(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            // A requisição foi feita mas não houve resposta
            console.error('API did not respond', error.request);
            throw new BadRequestException('API did not respond');
        } else {
            // Algum erro na configuração da requisição
            console.error('Error setting up request', error.message);
            throw new BadRequestException(`Error setting up request: ${error.message}`);
        }
    }

    async getPayments(): Promise<any> {
      try {
          const response = await this.httpClient.get('/payments');
          return response.data;
      } catch (error) {
          this.handleAxiosError(error);
      }
  }

  async getAllBillings(): Promise<any> {
    try {
        const response = await this.httpClient.get('payments');
        return response.data;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
}

async getBillingById(id: string): Promise<any> {
    try {
        const response = await this.httpClient.get(`payments/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Erro específico da resposta da API
            throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
        } else {
            // Erro genérico
            throw new BadRequestException('Failed to fetch the billing.');
        }
    }
}

async updateBilling(id: string, updateBillingDTO: CreateBillingDTO): Promise<any> {
    try {
        const response = await this.httpClient.put(`payments/${id}`, updateBillingDTO);
        return response.data;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
}

async deleteBilling(id: string): Promise<any> {
    try {
        const response = await this.httpClient.delete(`payments/${id}`);
        return response.data;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
}
}
