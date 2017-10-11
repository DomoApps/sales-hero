(function(DataService, ChartService) {
  var SELECTORS = {
    repFilter: 'select[name="rep-name"]',
    summaryContainer: '.summary-container',
    repChart: '.performance-chart',
    salesChart: '.sales-chart',
  };

  window.onload = function() {
    document.querySelector(SELECTORS.repFilter).onchange = handleFilterChange;
    
    DataService.getRepList().then(function(list) {
      // get the rep filter menu
      var select = document.querySelector(SELECTORS.repFilter);
      
      // add a default "Team" option
      var defaultOption = document.createElement('option');
      defaultOption.text = 'Full Team';
      defaultOption.value = '';
      select.appendChild(defaultOption);

      // add each rep from the data
      list.forEach(function(name) {
        var option = document.createElement('option');
        option.value, option.text = name;
        select.appendChild(option);
      });

      // trigger app render
      handleFilterChange();
    });    
  }

  function handleFilterChange() {
    var selectedRep = getSelectedSalesRep();
    
    buildTopPerformers();
    buildSummaryTiles(selectedRep);
    buildSalesRepPerformance(selectedRep);
  }

  function getSelectedSalesRep() {
    var rep = document.querySelector(SELECTORS.dateFilter).value;
    return (rep === '' || !rep) ? null : rep; 
  }

  function buildSummary(grain) {
    DataService.getSummary(grain).then(function(data) {
      var container = document.querySelector(SELECTORS.summaryContainer);
      
      // remove existing children
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // loop over rows in data
      data.forEach(row => {
        var html = `
          <div class="card">
            <div class="card-title">${row.label}</div>
            <div class="card-content -numeric">${ChartService.formatCurrency(row.value)}</div>
          </div>
        `;

        container.insertAdjacentHTML('beforeend', html);
      });

      // wait for summary before drawing charts
      buildRepPerformance(grain);
      buildSalesPerformance(grain);
    });
  }

  function buildRepPerformance(grain) {
    DataService.getRepPerformance(grain).then(function(data) {
      const chart = document.querySelector(SELECTORS.repChart);
      ChartService.drawRepChart(chart, data)
    });
  }

  function buildSalesPerformance(grain) {
    DataService.getSalesPerformance(grain).then(data => {
      const chart = document.querySelector(SELECTORS.salesChart);
      ChartService.drawSalesChart(chart, data);
    });
  }
})(DataService, ChartService);