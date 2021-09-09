import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Sale, SaleSchema } from '../../entities/sale.entity';
import { SaleRepository } from '../../repositories/sale.repository';
import { ClientModule } from '../client/client.module';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../user/user.module';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
    imports: [UserModule, SessionModule, ClientModule, MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }])],
    controllers: [SaleController],
    providers: [SaleService, SaleRepository],
    exports: [SaleService, SaleRepository],
})
export class SaleModule {}
