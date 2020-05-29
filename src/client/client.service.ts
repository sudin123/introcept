import { Injectable } from '@nestjs/common';
import { resolve, join } from 'path';
const fs = require('fs')
import { parse, format } from 'fast-csv';
const filePath = resolve(join(__dirname, '..', '../public/clients.csv'))
const PER_PAGE = 10;

@Injectable()
export class ClientService {
    getColumns(): Array<Object> {
        return [
            {
                title: 'Name',
                type: 'string',
                id: 'name',
            },
            {
                title: 'Gender',
                type: 'options',
                id: 'gender',
                options: [
                    'Male',
                    'Female',
                    'Others'
                ],
            },
            {
                title: 'Phone',
                type: 'string',
                id: 'phone',
                maxlength: 10
            },
            {
                title: 'Email',
                type: 'string',
                id: 'email',
            },
            {
                title: 'Address',
                type: 'string',
                required: false,
                id: 'address',
                rule: null
            },
            {
                title: 'Nationality',
                type: 'string',
                required: false,
                id: 'nationality',
            },
            {
                title: 'Date of Birth',
                type: 'date',
                id: 'dob',
            },
            {
                title: 'Preferred Mode of Contact',
                type: 'options',
                id: 'mode_of_contact',
                options: [
                    'Email',
                    'Phone',
                    'None'
                ],
            },
            {
                title: 'Education Background',
                type: 'textarea',
                id: 'education_background',
            }
        ];
    }

    getCount(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                fs.createReadStream(filePath)
                    .pipe(parse({ headers: true }))
                    .on('data', row => {
                    })
                    .on('end', (rowCount) => {
                        resolve(rowCount)
                    })
            } catch (e) {
                reject(false)
            }
        })
    }

    checkClientsCsv() {
        return new Promise((resolve, reject) => {
            try {
                fs.openSync(filePath, 'r')
            } catch (e) {
                fs.openSync(filePath, 'w')
            } finally {
                resolve(true)
            }
        });
    }

    get(inputs: Object): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.checkClientsCsv()
                let obj = {
                    items: [],
                    count: await this.getCount()
                }
                if (obj.count === 0) {
                    resolve(obj)
                }
                fs.createReadStream(filePath)
                    .pipe(parse({ headers: true, maxRows: PER_PAGE, skipRows: (inputs['page'] - 1) * PER_PAGE }))
                    .on('data', row => {
                        obj.items.push(row)
                        resolve(obj)
                    })
            } catch (e) {
                reject(false)
            }
        })

    }

    store(inputs: Object): Promise<Boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.checkClientsCsv()
                let count = await this.getCount()
                const csvStream = format({ headers: true, includeEndRowDelimiter: true, writeHeaders: (count > 0) ? false : true });
                csvStream.pipe(fs.createWriteStream(filePath, { flags: 'a' })).on('end', process.exit);
                csvStream.write(inputs);
                csvStream.end();
                resolve(true);
            } catch (e) {
                reject(false);
            }
        });
    }

}
