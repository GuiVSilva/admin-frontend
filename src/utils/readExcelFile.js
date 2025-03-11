import * as XLSX from 'xlsx'

/**
 * Lê um arquivo Excel e retorna os dados em formato JSON.
 * @param {File} file - Arquivo Excel selecionado pelo usuário.
 * @returns {Promise<Array<Object>>} - Retorna uma Promise com os dados processados.
 */
export const readExcelFile = file => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('Nenhum arquivo selecionado.')
      return
    }

    const reader = new FileReader()

    reader.onload = e => {
      try {
        const binaryStr = e.target.result
        const workbook = XLSX.read(binaryStr, { type: 'binary' })

        // Pegando a primeira aba da planilha
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        // Convertendo para JSON
        const parsedData = XLSX.utils.sheet_to_json(sheet)

        resolve(parsedData)
      } catch (error) {
        reject('Erro ao processar o arquivo: ' + error.message)
      }
    }

    reader.onerror = () => reject('Erro ao ler o arquivo.')
    reader.readAsBinaryString(file)
  })
}
