var ChartService = (function(vega) {
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

    return append ? `$${rounded}${append}` : `$${rounded}`;
  }

  function drawRepChart(element, data) {
    // const repSeries = ['reps'].concat(data);
    // const salesSeries = ['sales'].concat(data);

    // c3.generate({
    //   bindto: element,
    //   legend: { show: false },
    //   tooltip: { show: false },
    //   size: { width: 350 },
    //   padding: {
    //     top: 20,
    //     right: 30,
    //     left: 20
    //   },
    //   data: {
    //     x: 'reps',
    //     columns: [repSeries, salesSeries],
    //     type: 'bar',
    //     colors: { sales: '#fb8d33' }
    //   },
    //   axis: {
    //     rotated: true,
    //     x: { type: 'category', show: false },
    //     y: {
    //       tick: {
    //         format: formatCurrency,
    //         count: 2
    //       }
    //     },
    //   },
    //   bar: { width: 35 }
    // });
  }

  function drawSalesChart(element, data) {
    vega.loader()
      .load('/assets/charts/sales.spec.json')
      .then(function(config) {
        var json = JSON.parse(config);
        json.data[0].values = data;

        render(json);
      });

    function render(spec) {
      new vega.View(vega.parse(spec))
        .renderer('svg')
        .initialize(element)
        .hover()
        .run();
    }

    // const dateSeries = ['date'].concat(data.map(row => row.date));
    // const salesSeries = ['sales'].concat(data.map(row => row.amount));

    // c3.generate({
    //   bindto: element,
    //   legend: { show: false },
    //   tooltip: { show: false },
    //   grid: { y: { show: true } },
    //   padding: { top: 20, right: 50, bottom: 10 },
    //   data: {
    //     x: 'date',
    //     columns: [dateSeries, salesSeries],
    //     type: 'bar',
    //     colors: { sales: '#e45621' }
    //   },
    //   axis: {
    //     x: { type: 'timeseries' },
    //     y: {
    //       tick: {
    //         format: formatCurrency,
    //         count: 4
    //       }
    //     }
    //   },
    // });
  }

  return {
    formatCurrency: formatCurrency,
    drawRepChart: drawRepChart,
    drawSalesChart: drawSalesChart
  };
})(vega);
