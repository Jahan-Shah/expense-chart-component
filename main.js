import './reset.css';
import './style.css';

async function fetchData() {
  try {
    const response = await fetch('/data.json');
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
      const value = document.createElement("p");

      const barHeight = Math.ceil(item.amount) * 2.8;

      day.innerText = item.day

      bar.style.height = 0;
      bar.style.width = `48px`;
      bar.classList.add('bar');

      value.innerText = `$${item.amount}`;

      value.classList.add('value');
      day.classList.add('expense__day');
      barDiv.classList.add('expense__bar');
      value.classList.add('show');


      if (item.amount === highestValue) bar.classList.add('highest__value');

      let leaveTimeout, enterTimeout

      // event listeners for hover state
      bar.addEventListener('mouseenter', () => {
        clearTimeout(leaveTimeout);
        barDiv.prepend(value);
        enterTimeout = setTimeout(() => {
          value.classList.add('show');
        }, 50);
      });
      bar.addEventListener('mouseleave', () => {
        clearTimeout(enterTimeout);
        value.classList.remove('show');

        leaveTimeout = setTimeout(() => {
          barDiv.removeChild(value);
        }, 300);
      });

      // adding elemets to the parent container
      barDiv.appendChild(bar);
      barDiv.appendChild(day);
      chartContainer.appendChild(barDiv);

      // timeout function for animation
      setTimeout(() => {
        bar.style.height = `${barHeight}px`;
      }, 100)
    });
  } catch (err) {
    console.error(err);
  }

}

fetchData();