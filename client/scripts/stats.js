document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem('access_token')) {
    window.location.href = '/';
  }

  const currentCurrency ='BTCUSDT';

  getData(currentCurrency, (data) => {

    console.log(data);

    document.getElementById('current').innerText = data.current.price;

    console.log(data.history)

    const history = data.history.map(item => item.price)
    const labels = data.history.map(item => {
      return new Date(item.createdAt).toLocaleString();
    })
    console.log(history)
    const ctx = document.getElementById("line-chart").getContext("2d");

    const config = {
      labels: labels,
      datasets: [
        {
          label: currentCurrency,
          data: history,
          fill: false,
          borderColor: "#0074D9", // Line color
          backgroundColor: "#f0f0f0", // Area below the line
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    };

    const chart = new Chart(ctx, {
      type: "line",
      data: config,
      options: options,
    });
  });
});
