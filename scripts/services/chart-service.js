var ChartService = (function (vega, vegaTooltip) {
  
  function render(spec, element) {
    var view = new vega
      .View(vega.parse(spec))
      .renderer('svg')
      .initialize(element)
      .hover()
      .run();

    // add tooltip
    vegaTooltip.vega(view, {
      showAllFields: false,
      fields: [
        {
          title: 'Sales',
          field: 'amount',
          formatType: 'number',
          format: '$,d'
        }
      ],
      colorTheme: 'dark'
    });    
  }

  function formatCurrency(number) {
    let append;
    let rounded = number;
    if (number >= 1000000000) {
      append = 'B';
      rounded = (number / 1000000000).toFixed(1);
    } else if (number >= 1000000) {
      append = 'M';
      rounded = (number / 1000000).toFixed(1);
    } else if (number >= 1000) {
      append = 'K';
      rounded = (number / 1000).toFixed(1);
    }

    return append
      ? `$${rounded}${append}`
      : `$${rounded}`;
  }

  function drawRepChart(element, data) {
    vega
      .loader()
      .load('/assets/charts/rep.spec.json')
      .then(function (config) {
        var json = JSON.parse(config);
        json.data[0].values = data;

        render(json, element);
      });
  }

  function drawSalesChart(element, data) {
    vega
      .loader()
      .load('/assets/charts/sales.spec.json')
      .then(function (config) {
        var json = JSON.parse(config);
        json.data[0].values = data;

        render(json, element);
      });
  }

  return {
    formatCurrency: formatCurrency, 
    drawRepChart: drawRepChart, 
    drawSalesChart: drawSalesChart
  };
})(vega, vegaTooltip);
