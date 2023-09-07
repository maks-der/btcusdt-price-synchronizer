document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem('access_token')) {
    window.location.href = '/';
  }

  const btcData = await getData('BTCUSDT');
  const dogeData = await getData('DOGEUSDT');
  const apeData = await getData('APEUSDT');

  console.log(btcData);
  console.log(dogeData);
  console.log(apeData);

  document.getElementById('btc-current').innerText = btcData.current.price;
  document.getElementById('doge-current').innerText = dogeData.current.price;
  document.getElementById('ape-current').innerText = apeData.current.price;

  console.log(btcData.history)

  const btcHistory = btcData.history.map(item => item.price);
  const dogeHistory = dogeData.history.map(item => item.price);
  const apeHistory = apeData.history.map(item => item.price);
  const labels = btcData.history.map(item => {
    return new Date(item.createdAt).toLocaleString();
  })
  console.log(history)
  const ctx = document.getElementById("line-chart").getContext("2d");

  const config = {
    labels: labels,
    datasets: [
      {
        label: 'BTCUSDT',
        data: btcHistory,
        fill: true,
        borderColor: "#d9ae00",
        backgroundColor: "rgba(217,174,0,0.1)",
        tension: 0.4,
      },
      {
        label: 'DOGEUSDT',
        data: dogeHistory,
        fill: true,
        borderColor: "#00d93d",
        backgroundColor: "rgba(0,217,61,0.1)",
        tension: 0.4,
        hidden: true
      },
      {
        label: 'APEUSDT',
        data: apeHistory,
        fill: true,
        borderColor: "#0086d9",
        backgroundColor: "rgba(0,134,217,0.1)",
        tension: 0.4,
        hidden: true

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
