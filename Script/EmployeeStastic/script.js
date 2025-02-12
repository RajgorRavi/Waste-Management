// Initial setup
window.onload = function() {
  changeWasteType('plastic');
};

function changeWasteType(type) {
  const graphTitle = document.getElementById('graph-title');
  let wasteName = '';

  switch(type) {
      case 'plastic':
          wasteName = 'Plastic';
          break;
      case 'metal':
          wasteName = 'Metal';
          break;
      case 'paper':
          wasteName = 'Paper';
          break;
  }

  graphTitle.innerText = `${wasteName} Waste Segregation (Weekly)`;
}

function changeTimeView(view) {
  const graphTitle = document.getElementById('graph-title');
  let timeFrame = '';

  switch(view) {
      case 'week':
          timeFrame = 'Weekly';
          break;
      case 'month':
          timeFrame = 'Monthly';
          break;
      case 'year':
          timeFrame = 'Yearly';
          break;
  }

  // Update the graph title and data based on the selected time view
  const currentWaste = document.getElementById('graph-title').innerText.split(' ')[0].toLowerCase();
  graphTitle.innerText = `${currentWaste.charAt(0).toUpperCase() + currentWaste.slice(1)} Waste Segregation (${timeFrame})`;

  // Code to update the graph based on the selected time view
  updateGraph(currentWaste, view);
}

function updateGraph(type, view = 'week') {
  console.log(`Updating graph for ${type} (View: ${view})`);
}


// ------------------------!!!!!!!!!!!!!!--------------------------
function changeGraph(type) {
  // Hide all graphs
  document.getElementById('plasticGraph').style.display = 'none';
  document.getElementById('metalGraph').style.display = 'none';
  document.getElementById('paperGraph').style.display = 'none';

  // Show the selected graph
  let graphId = type + 'Graph';
  document.getElementById(graphId).style.display = 'block';

  // Update the graph with data
  drawGraph(graphId, type);
}



function drawGraph(graphId, type) {
  const ctx = document.getElementById(graphId).getContext('2d');
  
  // Clear the existing chart if there is one
  if (window.myCharts && window.myCharts[graphId]) {
    window.myCharts[graphId].destroy();
  }

  // Example data for each waste type
  const data = {
    plastic: [75, 69, 90, 91, 70, 74, 95],  
  metal: [55, 10, 70, 81, 56, 45, 40],    
  paper: [25, 29, 40, 51, 26, 15, 10] 
  };

  // Create a new chart
  window.myCharts = window.myCharts || {};
  window.myCharts[graphId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: `Waste Collected (kg) - ${type}`,
        data: data[type],
        borderColor: '#36A2EB',
        borderWidth: 5,
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Waste (kg)'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
}

// Initially display the plastic graph on page load
window.onload = function() {
  changeGraph('plastic');
};

function showBarChart(){
  document.addEventListener("DOMContentLoaded", function() {
      // Get the context of the canvas element we want to select
      var ctx = document.getElementById('pieChart').getContext('2d');
    
      // Create the pie chart
      var myPieChart = new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ['location 1', 'location 2', 'location 3', 'location 4', 'location 5'],
              datasets: [{
                  label: 'Waste Segregation',
                  data: [300, 150, 100, 50, 100],
                  backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#4BC0C0',
                      '#9966FF'
                  ]
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      position: 'top',
                  },
                  tooltip: {
                      callbacks: {
                          label: function(tooltipItem) {
                              return tooltipItem.label + ': ' + tooltipItem.raw + ' kg';
                          }
                      }
                  }
              }
          }
      });
    });
    
}

showBarChart();

