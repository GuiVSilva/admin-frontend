/**
 * Formata um valor decimal (ex: 10.00) para o formato monetário brasileiro (ex: R$ 10,00).
 * @param {number|string} value - O valor decimal a ser formatado.
 * @returns {string} - O valor formatado como moeda.
 */
export const formatCurrency = value => {
  if (value == null || isNaN(value)) return 'R$ 0,00'

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
