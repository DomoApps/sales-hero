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

  function formatCurrency(number, fm) {
    var format = (fm) ? fm : '$0.0a';
    return numeral(number).format(format);
  }

  function drawRepChart(element, data) {
    vega
      .loader()
      .load('/src/assets/charts/rep.spec.json')
      .then(function (config) {
        var json = JSON.parse(config);
        json.data[0].values = data;

        render(json, element);
      });
  }

  function drawSalesChart(element, data) {
    vega
      .loader()
      .load('/src/assets/charts/sales.spec.json')
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
