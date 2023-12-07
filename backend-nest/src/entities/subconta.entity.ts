import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
   
  } from 'typeorm';
  
  @Entity()
  export class SubConta {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column()
    loginEmail: string;
  
    @Column()
    phone: string;
  
    @Column()
    mobilePhone: string;
  
    @Column()
    address: string;
  
    @Column()
    addressNumber: string;
  
    @Column()
    complement: string;
  
    @Column()
    province: string;
  
    @Column()
    postalCode: string;
  
    @Column()
    cpfCnpj: string;
  
    @Column()
    birthDate: Date;
  
    @Column()
    personType: string;
  
    @Column()
    companyType: string;
  
    @Column()
    city: number;
  
    @Column()
    state: string;
  
    @Column()
    country: string;
  
    @Column()
    site: string;
  
    @Column()
    apiKey: string;
  
    @Column()
    walletId: string;
  
    @Column()
    agency: string;
  
    @Column()
    account: string;
  
    @Column()
    accountDigit: string;
  }
  