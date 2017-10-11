(function(DataService, ChartService) {
  var SELECTORS = {
    repFilter: 'select[name="rep-name"]',
    summaryContainer: '.summary-container',
    repChart: '.performance-chart',
    salesChart: '.sales-chart',
    loader: '.loader',
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

      // one-time rendering of performance rankings
      buildTopPerformers();

      // update filter-based values
      handleFilterChange();
    });    
  }

  function handleFilterChange() {
    isLoading(true);
    var selectedRep = getSelectedSalesRep();
    
    Promise.all([
      buildSummaryTiles(selectedRep),
      buildSalesRepPerformance(selectedRep)
    ]).then(function() {
      isLoading(false);
    })
  }


  function getSelectedSalesRep() {
    var rep = document.querySelector(SELECTORS.repFilter).value;
    return (rep === '' || !rep) ? null : rep; 
  }

  function buildSummaryTiles(filter) {
    return DataService.getSummary(filter).then(function(data) {
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
            <div class="card-content -numeric">${ChartService.formatCurrency(row.value, row.format)}</div>
          </div>
        `;

        container.insertAdjacentHTML('beforeend', html);
      });
    });
  }

  function buildTopPerformers(filter) {
    return DataService.getRepPerformance(filter).then(function(data) {
      const chart = document.querySelector(SELECTORS.repChart);
      ChartService.drawRepChart(chart, data)
    });
  }

  function buildSalesRepPerformance(filter) {
    return DataService.getSalesPerformance(filter).then(data => {
      const chart = document.querySelector(SELECTORS.salesChart);
      ChartService.drawSalesChart(chart, data);
    });
  }

  function isLoading(loading) {
    var loader = document.querySelector(SELECTORS.loader);

    if (loading) {
      loader.style.visibility = 'visible';
    } else {
      loader.style.visibility = 'hidden';
    }
  }
})(DataService, ChartService);