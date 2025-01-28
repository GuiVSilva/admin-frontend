import axios from 'axios'

export class BuscaCep {
  async findCep(cep) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return response
  }
}

export const buscaCepService = new BuscaCep()
