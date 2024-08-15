const moment = require('moment');
const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

const startDate = moment('2022-01-01');
const endDate = moment('2022-12-31');
let totalDays = 0;


// Configurar para servir arquivos estáticos (HTML, CSS, JS) de uma pasta chamada 'public'
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});

axios.get('https://api-de-feriados.com.br/feriados')
  .then(response => {
    const holidays = response.data;

    for (let day = startDate; day <= endDate; day.add(1, 'days')) {
      if (day.isoWeekday() !== 6 && day.isoWeekday() !== 7 && !isHoliday(day, holidays)) {
        totalDays++;
      }
    }
    const axios = require('axios');

    const url = 'http://localhost:3000/feriados'; // substitua pela URL do seu servidor de teste local
    
    axios.get(url)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    console.log(`O número de dias úteis entre as datas é: ${totalDays}`);
  })
  .catch(error => {
    console.log(error);
  });

function isHoliday(day, holidays) {
  return holidays.includes(day.format('YYYY-MM-DD'));
}