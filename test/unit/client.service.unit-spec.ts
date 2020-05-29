
import { ClientService } from '../../src/client/client.service';

test('get columns', () => {
  let clientService = new ClientService()
  let columns = clientService.getColumns()
  expect(columns[0]['id']).toBe('name')
  expect(columns[0]['title']).toBe('Name')
});

test('get rows count in csv file', async () => {
  let clientService = new ClientService()
  let count = await clientService.getCount()
  expect(typeof count).toBe('number')
})

test('fetch clients', async () => {
  let clientService = new ClientService()
  let clients = await clientService.get({ page: 1 })
  expect(clients).toBeInstanceOf(Object)
  expect(typeof clients.count).toBe('number')
  expect(clients.items).toBeInstanceOf(Array)
})

test('store client', async () => {
  let clientService = new ClientService()
  let res = await clientService.store(
    {
      name: 'John Doe',
      gender: 'Male',
      phone: '9821936585',
      email: 'sudingrng@gmail.com',
      dob: '1994-01-07',
      mode_of_contact: 'Email',
      nationality: 'Nepal',
      address: 'Bhaktapur',
      education_background: 'BE'
    }
  )
  expect(res).toBe(true)
})

