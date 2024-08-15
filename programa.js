const express = require('express'); // Importa o módulo 'express' para criar um servidor web
const app = express(); // Cria uma instância do express
const port = 3000; // Define a porta onde o servidor vai rodar
const moment = require('moment'); // Importa o módulo 'moment' para manipulação de datas

app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

app.get('/', (req, res) => { // Define a rota para o caminho raiz ('/')
    res.render('./public/views/index.ejs', { feriados: feriados }); // Renderiza o arquivo 'index.ejs' e passa os feriados como dados
});

app.listen(port, () => { // Inicia o servidor na porta definida
  console.log(`Servidor rodando em http://localhost:3000`); // Loga uma mensagem no console informando que o servidor está rodando
});

const fs = require('fs'); // Importa o módulo 'fs' para leitura e escrita de arquivos

const feriadosJson = fs.readFileSync('./public/feriados.json', 'utf8'); // Lê o arquivo 'feriados.json' da pasta 'public'
const feriados = JSON.parse(feriadosJson); // Converte o conteúdo do arquivo de JSON para um objeto JavaScript

const startDate = moment('2024-01-01'); // Define a data de início como 1 de janeiro de 2024
const endDate = moment('2024-12-31'); // Define a data de término como 31 de dezembro de 2024
let totalDays = 0; // Inicializa a variável que vai contar os dias úteis

// Loop através de cada dia entre a data de início e a data de término
for (let day = startDate; day <= endDate; day.add(1, 'days')) {
  // Se o dia não for sábado (6) ou domingo (7) e não for feriado
  if (day.isoWeekday() !== 6 && day.isoWeekday() !== 7 && !isHoliday(day, feriados)) {
    totalDays++; // Incrementa o contador de dias úteis
  }
}

console.log(`O número de dias úteis entre as datas é: ${totalDays}`); // Exibe o total de dias úteis no console

// Função que verifica se um determinado dia é feriado
function isHoliday(day, holidays) {
  // Retorna true se o dia estiver na lista de feriados
  return holidays.some(holiday => holiday.date === day.format('YYYY-MM-DD'));
}
