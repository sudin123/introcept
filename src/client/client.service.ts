import { Injectable } from '@nestjs/common';
import { resolve, join } from 'path';
const fs = require('fs')
import { parse, format } from 'fast-csv';
const filePath = resolve(join(__dirname, '..', '../public/data.csv'))
const PER_PAGE = 10;

@Injectable()
export class ClientService {
    getColumns(): Array<Object> {
        return [
            {
                title: 'Name',
                type: 'string',
                required: true,
                id: 'name'
            },
            {
                title: 'Gender',
                type: 'options',
                required: true,
                id: 'gender',
                options: [
                    'Male',
                    'Female',
                    'Others'
                ]
            },
            {
                title: 'Phone',
                type: 'string',
                required: true,
                id: 'phone',
            },
            {
                title: 'Email',
                type: 'string',
                required: true,
                id: 'email',
            },
            {
                title: 'Address',
                type: 'string',
                required: true,
                id: 'address',
            },
            {
                title: 'Nationality',
                type: 'string',
                required: true,
                id: 'nationality',
            },
            {
                title: 'Date of Birth',
                type: 'date',
                required: true,
                id: 'dob',
            },
            {
                title: 'Preferred Mode of Contact',
                type: 'options',
                required: true,
                id: 'mode_of_contact',
                options: [
                    'Email',
                    'Phone',
                    'None'
                ]
            },
            {
                title: 'Education Background',
                type: 'textarea',
                required: true,
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

    get(inputs: Object): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
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
