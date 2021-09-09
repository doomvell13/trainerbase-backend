import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { SaleRepository } from '../../repositories/sale.repository';
import { UpdateSessionDto } from '../session/dto/updateSession.dto';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';
import { CreateSaleDto } from './dto/createSale.dto';

@Injectable()
export class SaleService {
    constructor(
        private saleRepository: SaleRepository,
        private readonly userService: UserService,
        private readonly sessionService: SessionService,
    ) {}

    async createSale(createSaleDto: CreateSaleDto) {
        const { userId, sessionId, clientId } = createSaleDto;

        const getUser: any = await this.userService.getUserById(userId);

        if (getUser.role === 'ADMIN') {
            const session = await this.sessionService.getSessionById(sessionId);
            const createdSale = await this.saleRepository.createSale(createSaleDto, session, userId);

            const updateSessionDto: UpdateSessionDto = {
                id: session._id,
                status: 'SOLD',
                clientId: clientId,
            };
            await this.sessionService.updateSession(updateSessionDto);

            return createdSale;
        } else {
            throw new UnauthorizedException('Incorrect Role');
        }
    }

    async getSaleById(saleId: MongooseSchema.Types.ObjectId) {
        const sale: any = await this.saleRepository.getSaleById(saleId);
        return sale;
    }

    async getSales(query: { from: number; limit: number }) {
        const sales = await this.saleRepository.getSales(query);
        return sales;
    }
}
