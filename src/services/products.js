import api from './api'

export class ProductsService {
  async createProduct(data) {
    const response = await api.post('/products/create-product', data)
    return response.data
  }

  async findProducts() {
    const response = await api.get('/products/find-products')
    return response.data
  }

  async updateProduct(data) {
    const response = await api.put('/products/update-product', data)
    return response.data
  }

  async deleteProduct(data) {
    const response = await api.delete('/products/delete-product', { data })
    return response.data
  }
}

export const productsService = new ProductsService()
