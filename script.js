const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    //fetch from the API and passing the first currency as well
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
    //   console.log(data);
    
    // get the rate (to exchange to currency two)
    const rate = data.rates[currency_two];

    // set the text in the DOM
    rateEl.innerText = `
        1 ${currency_one} = ${rate} ${currency_two}
        `;
    
        //display the value in the DOM
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Swap functionality
function swapCurrency () {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;

    calculate();
}


// Events Listeners
currencyEl_one.addEventListener('change', calculate );
currencyEl_two.addEventListener('change', calculate);

amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', swapCurrency);

calculate();
