import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './Clients.Service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
