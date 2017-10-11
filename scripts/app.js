(function(DataService, ChartService) {
  var SELECTORS = {
    filter: 'select[name="date-grain"]',
    summaryContainer: '.summary-container',
    repList: '.rep-list',
    repChart: '.performance-chart',
    salesChart: '.sales-chart',
  };

  window.onload = function() {
    document.querySelector(SELECTORS.filter).onchange = handleFilterChange;
    handleFilterChange();
  }

  function handleFilterChange() {
    var grain = getDateGrain();
    buildSummary(grain);
  }

  function getDateGrain() {
    // get the value from the select menu
    var grain = document.querySelector(SELECTORS.filter).value;
    return (grain === '' || !grain) ? null : grain;
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