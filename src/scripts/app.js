(function(DataService, ChartService) {
  // css selectors for document queries
  var SELECTORS = {
    repFilter: 'select[name="rep-name"]',
    summaryContainer: '.summary-container',
    repChart: '.performance-chart',
    salesChart: '.sales-chart',
    loader: '.loader',
  };

  // initial load
  window.onload = function() {
    document.querySelector(SELECTORS.repFilter).onchange = handleFilterChange;
    
    // TODO: add logic to populate filter menu with rep names
    isLoading(false);
  }

  function handleFilterChange() {
    var selectedRep = getSelectedSalesRep();
    
    // TODO: refresh data with change in filter
    console.log('Selected Filter: ', selectedRep);
  }

  // get currently selected filter option
  function getSelectedSalesRep() {
    var rep = document.querySelector(SELECTORS.repFilter).value;
    return (rep === '' || !rep) ? null : rep; 
  }

  function buildSummaryTiles(filter) {
    // TODO: add logic to get sales summary data and build summary tiles
  }

  function buildTopPerformers(filter) {
    // TODO: add logic to get sales by rep and build a chart
  }

  function buildSalesRepPerformance(filter) {
    // TODO: add logic to get total sales by date and build a chart
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