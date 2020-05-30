import { Controller, Get, Post, Body, HttpException, Query, HttpStatus } from '@nestjs/common';
import { ClientService } from './client.service';

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
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/client')
    async store(@Body() inputs: Object): Promise<string> {
        try {
            await this.clientService.store(inputs)
            return 'Successfully Inserted'
        } catch (e) {
            throw new HttpException(e, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
