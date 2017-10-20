var ChartService = (function (vega, vegaTooltip, numeral) {
  var service = {};

  service.formatCurrency = function(number, fm) {
    var format = (fm) ? fm : '$0.0a';
    return numeral(number).format(format);
  }

  service.drawRepChart = function(element, data) {
    vega
      .loader()
      .load('/src/assets/charts/rep.spec.json')
      .then(function (config) {
        var json = JSON.parse(config);
        json.data[0].values = data;

        render(json, element);
      });
  }

  service.drawSalesChart = function(element, data) {
    vega
      .loader()
      .load('/src/assets/charts/sales.spec.json')
      .then(function (config) {
        var json = JSON.parse(config);
        json.data[0].values = data;

        render(json, element);
      });
  }

  // ==== Private functions ====

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
  
  return service;
})(vega, vegaTooltip, numeral);
