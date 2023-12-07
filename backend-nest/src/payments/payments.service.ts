import { BadRequestException,   Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {   SaleCreateLinkPaymentDTO } from './payments.controller';

@Injectable()
export class PaymentService {
    
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


   
    // Método para criar um link de pagamento através de uma API externa
    async createPaymentLink(saleCreateLinkPaymentDTO: SaleCreateLinkPaymentDTO): Promise<any> {
        try {
            // Construindo o payload com base no DTO
            const payload = {
                billingType: saleCreateLinkPaymentDTO.billingType,
                chargeType: saleCreateLinkPaymentDTO.chargeType,
                name: saleCreateLinkPaymentDTO.name,
                description: saleCreateLinkPaymentDTO.description,
                endDate: saleCreateLinkPaymentDTO.endDate,
                value: saleCreateLinkPaymentDTO.value,
                dueDateLimitDays: saleCreateLinkPaymentDTO.dueDateLimitDays,
                subscriptionCycle: saleCreateLinkPaymentDTO.subscriptionCycle,
                maxInstallmentCount: saleCreateLinkPaymentDTO.maxInstallmentCount,
                notificationEnabled: saleCreateLinkPaymentDTO.notificationEnabled,
            };
    
            const response = await this.httpClient.post('paymentLinks', payload);
            return response;
        } catch (error) {
            if (error.response) {
                // Capturando erros específicos da resposta da API
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                // Erro genérico
                throw new BadRequestException('Failed to create the payment link.');
            }
        }
    }

    async PaymentLinksList(): Promise<any> {
        try {
            const response = await this.httpClient.get('paymentLinks');
            return response.data;
        }
        catch (error) {
            if (error.response) {
                // Capturando erros específicos da resposta da API
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                // Erro genérico
                throw new BadRequestException('Failed to create the payment link.');
            }
        }
    }


    async editar_link_pagamento_id(id:any, linkEditado : SaleCreateLinkPaymentDTO) : Promise<any>{
        try{
            const response = await this.httpClient.put(`paymentLinks/${id}`, linkEditado)
            return response.data
        }
        catch(error){
            if (error.response) {
                // Capturando erros específicos da resposta da API
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                // Erro genérico
                throw new BadRequestException('Failed to create the payment link.');
            }
        }  
    }



    async ReperaLinkPagamentoByID(id:any) : Promise<any>{
        try{
            const response = await this.httpClient.get(`paymentLinks/${id}`)
            return response.data
        }
        catch(error){
            if (error.response) {
                // Capturando erros específicos da resposta da API
                throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                // Erro genérico
                throw new BadRequestException('Failed to create the payment link.');
            }
        }  
    }
}