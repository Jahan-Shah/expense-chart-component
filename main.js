import './reset.css';
import './style.css';

async function fetchData() {
  try {
    const response = await fetch('./data.json');
    const data = await response.json();

    let highestValue = 0;
    data.forEach(item => {
      if (item.amount > highestValue) highestValue = item.amount;
    })

    const chartContainer = document.getElementById('expense__chart');

    data.forEach(item => {

      const barDiv = document.createElement("div");
      const bar = document.createElement("div");
      const day = document.createElement("p");

      day.innerText = item.day

      const barHeight = item.amount * 2.785;

      barDiv.classList.add('expense__bar');
      bar.classList.add('bar');

      if (item.amount === highestValue) bar.classList.add('highest__value');

      bar.style.width = `48px`;
      bar.style.height = `${barHeight}px`;

      barDiv.appendChild(bar);
      barDiv.appendChild(day);
      chartContainer.appendChild(barDiv);
    });
  } catch (err) {
    console.error(err);
  }

}

fetchData();