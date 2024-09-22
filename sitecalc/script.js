document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculator').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
        calculate();
    });

    document.getElementById('dailyReturnsBtn').addEventListener('click', function(event) {
        calculateDailyReturns(); // Calculate daily returns when this button is clicked
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculator').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
        calculate();
    });

    document.getElementById('dailyReturnsBtn').addEventListener('click', function(event) {
        calculateDailyReturns(); // Calculate daily returns when this button is clicked
    });

    // Toggle the visibility of the "Ver Rendimentos Diários" section
    let rendimentosDiariosVisible = false;

    const dailyReturnsBtn = document.getElementById('dailyReturnsBtn');
    const dailyResultados = document.getElementById('dailyResultados');

    dailyReturnsBtn.addEventListener('click', () => {
        if (!rendimentosDiariosVisible) {
            dailyResultados.style.display = 'block';
            rendimentosDiariosVisible = true;
        } else {
            dailyResultados.style.display = 'none';
            rendimentosDiariosVisible = false;
        }
    });
});

// ... rest of your code ...

function calculate() {
    let amount = parseFloat(document.getElementById('amount').value);
    let Ciclo = parseInt(document.getElementById('Ciclo').value);
    let rate = parseFloat(document.getElementById('rate').value);
    let profitRate = parseFloat(document.getElementById('trader').value);
    let Resultados = document.getElementById('Resultados');
    let resultHTML = '<h2>Resultados</h2>';

    for (let i = 1; i <= Ciclo; i++) {
        let profit = amount * profitRate;
        amount += profit;
        resultHTML += `<p class="ciclo-box">Ciclo ${i}: $${amount.toFixed(2)}<br>(R$ ${(amount * rate).toFixed(2)})</p>`;
        
    }

    Resultados.innerHTML = resultHTML;
}

fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
  .then(response => response.json())
  .then(data => {
    const valorDolar = data.USDBRL.bid;
    document.getElementById('valorDolar').innerHTML = `R$ ${valorDolar}`;
  })
  .catch(error => console.error('Erro ao obter o valor do dólar:', error));


function calculateDailyReturns() {
    let amount = parseFloat(document.getElementById('amount').value);
    let rate = parseFloat(document.getElementById('rate').value);
    let traderProfit = parseFloat(document.getElementById('trader').value);
    let selectedOption = document.getElementById('trader').selectedOptions[0].text;
    let days = parseInt(selectedOption.match(/(\d+) dias/)[1]);

    

    let dailyProfitRate = Math.pow(1 + traderProfit, 1 / days) - 1;
    let dailyProfit = amount * dailyProfitRate;
    let dailyResultados = document.getElementById('dailyResultados');
    let resultHTML = `<h2>Rendimento Diário Por Ciclo (${days} dias)</h2>`;
    resultHTML += `<table><tr><th>Dias</th><th>Rendimento Diário ($)</th><th>Rendimento Diário (R$)</th><th>Porcentagem Diária %</th></tr>`;

    for (let i = 1; i <= days; i++) {
        let dailyProfitPercentage = (dailyProfitRate * 100).toFixed(2); // Calculate the daily return percentage
        amount += dailyProfit;
        resultHTML += `<tr><td>${i}</td><td>${dailyProfit.toFixed(2)}</td><td>${(dailyProfit * rate).toFixed(2)}</td><td>${dailyProfitPercentage}%</td></tr>`;
        dailyProfit = amount * dailyProfitRate;  // Recalculate profit as it compounds daily
    }

    resultHTML += `</table>`;
    dailyResultados.innerHTML = resultHTML;
}
