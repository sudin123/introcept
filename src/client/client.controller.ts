import { Controller, Get, Post, Body, HttpException, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './client.dto';

@Controller('/api')
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Get('/columns')
    getColumns(): Array<Object> {
        return this.clientService.getColumns()
    }

    @Get('/clients')
    async index(@Query() inputs: Object): Promise<Object> {
        try {
            return await this.clientService.get(inputs)
        } catch (e) {
            throw new HttpException('Something went wrong', 400);
        }
    }

    @Post('/client')
    async store(@Body() clientDto: ClientDto): Promise<string> {
        try {
            await this.clientService.store(clientDto)
            return 'Successfully Inserted'
        } catch (e) {
            throw new HttpException('Something went wrong', 400);
        }
    }
}
