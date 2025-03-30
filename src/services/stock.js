import api from './api'

export class StockService {
  async createLocation(data) {
    const response = await api.post('/stock/create-location', data)
    return response.data
  }

  async findLocations() {
    const response = await api.get('/stock/find-locations')
    return response.data
  }

  async updateLocation(data) {
    const response = await api.put('/stock/update-location', data)
    return response.data
  }

  async deleteLocation(data) {
    const response = await api.delete('/stock/delete-location', { data })
    return response.data
  }

  async createMovement(data) {
    const response = await api.post('/stock/create-movement', data)
    return response.data
  }

  async findMoviments() {
    const response = await api.get('/stock/find-moviments')
    return response.data
  }
}

export const stockService = new StockService()
