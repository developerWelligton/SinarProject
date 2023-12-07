import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'; 
import { CreateSubAccountDTO } from './model/CreateSubAccountDTO';

 
@Injectable()
export class SubContaService {
    
    private httpClient: AxiosInstance;

  
    constructor() {
        this.httpClient = axios.create({
            baseURL: 'https://sandbox.asaas.com/api/v3/', // Base URL da API
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNTk1NjY6OiRhYWNoXzNiZmE4Mzg5LWYzNzktNDY1OS1hOTg3LTMyMzkxOWVmYTJkYg==', // Coloque seu token de acesso aqui
            },
        });
    }
    
    async createSubAccount(createSubAccountDTO: CreateSubAccountDTO): Promise<any> {
        try {
            // Aqui você passa o objeto DTO diretamente como payload para a chamada da API
            const response = await this.httpClient.post('accounts', createSubAccountDTO);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                throw new BadRequestException('Failed to create the sub-account.');
            }
        }
    }

    async listSubAccount(offset: number, limit: number): Promise<any> {
        try {
            // Construct the query string with parameters
            const queryParams = `offset=${offset}&limit=${limit}`;
            
            // Append the query parameters to the URL
            const url = `accounts?${queryParams}`;
    
            // Make the HTTP request with the updated URL
            const response = await this.httpClient.get(url);
            return response.data;
        } catch (error) {
            // Handle errors, including specific API error responses
            if (error.response) {
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                throw new BadRequestException('Failed to list the sub-account.');
            }
        }
    }
    
   
}
