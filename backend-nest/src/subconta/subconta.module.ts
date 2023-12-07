import { Module } from '@nestjs/common'; 
import { SubContaController } from './subconta.controller';
import { SubContaService } from './subconta.service';
 

@Module({
  imports: [ ],
  providers: [SubContaService],
  controllers: [SubContaController],
})
export class SubContaModule {}
