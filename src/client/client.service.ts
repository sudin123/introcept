import { Injectable } from '@nestjs/common';
import { resolve, join } from 'path';
const fs = require('fs')
import { parse, format } from 'fast-csv';
import { validateAll } from 'indicative/validator'
const filePath = resolve(join(__dirname, '..', '../public/clients.csv'))
const PER_PAGE = 5;
@Injectable()
export class ClientService {
    getColumns(): Array<Object> {
        return [
            {
                title: 'Name',
                type: 'text',
                id: 'name',
            },
            {
                title: 'Phone',
                type: 'number',
                id: 'phone',
                maxlength: 10
            },
            {
                title: 'Email',
                type: 'email',
                id: 'email',
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
                title: 'Address',
                type: 'text',
                required: false,
                id: 'address',
                rule: null
            },
            {
                title: 'Nationality',
                type: 'text',
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

    createCsvIfDeoesntExist(): Promise<any> {
        return new Promise((resolve) => {
            try {
                fs.readFileSync(filePath);
            } catch (err) {
                fs.createWriteStream(filePath, { flags: 'w' })
            } finally {
                resolve(true)
            }
        })
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
                reject(e)
            }
        })
    }

    get(inputs: Object): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.createCsvIfDeoesntExist()
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

    async validateClient(inputs: Object) {
        const rules = {
            name: 'required',
            email: 'required|email',
            phone: 'required|max:10|min:7',
            gender: 'required',
            dob: 'required',
            mode_of_contact: 'required'
        }
        const messages = {
            'name.required': 'Name is required',
            'email.required': 'Email is required',
            'email.email': 'Email is invalid',
            'gender.required': 'Please select a gender',
            'dob.required': 'Date of Birth is required',
            'mode_of_contact.required': 'Please select a mode of contact',
            'phone.required': 'Phone is required',
            'phone.min': 'Phone should have at least 7 numbers',
            'phone.max': 'Phone should have at least 7 numbers'
        }
        return await validateAll(inputs, rules, messages)
    }


    store(inputs: Object): Promise<Boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.validateClient(inputs);
                await this.createCsvIfDeoesntExist()
                let count = await this.getCount()
                const csvStream = format({ headers: true, includeEndRowDelimiter: true, writeHeaders: (count > 0) ? false : true });
                csvStream.pipe(fs.createWriteStream(filePath, { flags: 'a' })).on('end', process.exit);
                csvStream.write(inputs);
                csvStream.end();
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }

}
