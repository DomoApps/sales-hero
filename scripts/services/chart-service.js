var ChartService = (function (vega, vegaTooltip, numeral) {
  
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
    var format = (number >= 1000) ? '$0.00a' : '$0';
    return numeral(number).format(format);
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
})(vega, vegaTooltip, numeral);
