import api from './api'

export class ClientsSerivce {
  async createClient(data) {
    const response = await api.post('/clients/create-client', data)
    return response.data
  }

  async findClients() {
    const response = await api.get('/clients/find-clients')
    return response.data
  }

  async updateClient(data) {
    const response = await api.put('/clients/update-client', data)
    return response.data
  }

  async deleteClient(data) {
    const response = await api.delete('/clients/delete-client', { data })
    return response.data
  }

  async createManyClients(data) {
    const response = await api.post('/clients/create-many-clients', data)
    return response.data
  }
}
export const clientsService = new ClientsSerivce()
