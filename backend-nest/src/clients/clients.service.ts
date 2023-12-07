import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreateUserDTO } from './clients.controller';

 

@Injectable()
export class ClientsService {

 
    private httpClient: AxiosInstance;
 

  
    constructor() {
        this.httpClient = axios.create({
            baseURL: 'https://sandbox.asaas.com/api/v3', // Base URL da API
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNTk1NjY6OiRhYWNoXzNiZmE4Mzg5LWYzNzktNDY1OS1hOTg3LTMyMzkxOWVmYTJkYg==', // Coloque seu token de acesso aqui
            },
        });
    }

    async findAll(): Promise<any> {
        try {
            const response = await this.httpClient.get('customers');
            return response.data; // Retorna diretamente os dados da resposta
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async createCliente(createUserDTO: CreateUserDTO): Promise<any> {
        try {
            // Construindo o payload com base no DTO
            const payload = {
                name: createUserDTO.name,
                cpfCnpj: createUserDTO.cpfCnpj,
                email: createUserDTO.email,
                // Adicione outros campos do DTO conforme necessário
            };

            const response = await this.httpClient.post('customers', payload); // Faz a requisição POST para 'api/v3/customers'
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            if (error.response) {
                // Captura erros específicos da resposta da API
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                // Erro genérico
                throw new BadRequestException('Failed to create the customer.');
            }
        }
    }


    
    async getClientByID(id: any): Promise<any> {
        try {
            const response = await this.httpClient.get(`customers/${id}`); // Faz a requisição GET para 'customers/:id'
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            if (error.response) {
                // Captura erros específicos da resposta da API
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                // Erro genérico
                throw new BadRequestException('Failed to fetch the customer.');
            }
        }
    }

    async EditClientByID(id: any, editedUser : CreateUserDTO): Promise<any> {
        try {
            const response = await this.httpClient.put(`customers/${id}`, editedUser);
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            if (error.response) {
                // Captura erros específicos da resposta da API
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                // Erro genérico
                throw new BadRequestException('Failed to fetch the customer.');
            }
        }
    }

    async DeleteClientByID(id: any): Promise<any> {
        try {
            const response = await this.httpClient.delete(`customers/${id}`);
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            if (error.response) {
                // Captura erros específicos da resposta da API
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                // Erro genérico
                throw new BadRequestException('Failed to fetch the customer.');
            }
        }
    }

    async RestoreClientByID(id: any): Promise<any> {
        try {
            const response = await this.httpClient.post(`customers/${id}/restore`);
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            if (error.response) {
                // Captura erros específicos da resposta da API
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                // Erro genérico
                throw new BadRequestException('Failed to fetch the customer.');
            }
        }
    }



}
