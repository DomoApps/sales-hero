var DataService = (function(domo, Query) {
	var service = {};
	
	// unique list of sales reps for filter menu
	service.getRepList = function() {
		return (new Query())
			.select(['rep'])
			.groupBy(['rep'])
			.orderBy('rep')
			.fetch('sales')
			.then(function(data) {
				return data.map(function(row) { return row.rep; });
			});
	}

	// summary tile #1
	service.getTotalSales = function(filter) {
		var query = (new Query())
			.select(['amount'])
			.aggregate('amount', 'sum');
			
		if (filter) query.where('rep').equals(filter);
			
		return query
			.fetch('sales')
			.then(function(data) {
				return {
					label: 'Total Sales',
					value: data[0].amount
				};
			});
	}

	// summary tile #2
	service.getTopSale = function(filter) {
		var query = (new Query())
			.select(['client', 'amount'])
			.orderBy('amount', 'desc')
			.limit(1);

		if (filter) query.where('rep').equals(filter);

		return query
			.fetch('sales')
			.then(function(data) {
				return {
					label: 'Top Sale: ' + data[0].client,
					value: data[0].amount
				};
			})
	}

	// summary tile #3
	service.getLatestSale = function(filter) {
		var query = (new Query())
			.select(['client', 'amount'])
			.orderBy('date', 'descending')
			.limit(1);

		if (filter) query.where('rep').equals(filter);

		return query
			.fetch('sales')
			.then(function(data) {
				return {
					label: 'Latest Sale: ' + data[0].client,
					value: data[0].amount
				};
			})
	}

	// summary tile #4
	service.getSaleCount = function(filter) {
		var query = (new Query())
			.select(['rep'])
			.aggregate('rep', 'count');

		if (filter) query.where('rep').equals(filter);

		return query
			.fetch('sales')
			.then(function(data) {
				return {
					label: 'Sale Count',
					value: data[0].rep,
					format: '0'
				};
			})			
	}

	// summary tile #5
	service.getTopClient = function(filter) {
		var query = (new Query())
			.select(['client', 'amount'])
			.groupBy('client');

		if (filter) query.where('rep').equals(filter);

		return query
			.fetch('sales')
			.then(function(data) {
				var row = data
					.sort(function(a, b) {
						return b.amount - a.amount;
					})[0];

				return {
					label: 'Top Client: ' + row.client,
					value: row.amount				
				}
			});
	}
	
	// helper function to get all summary tiles
	service.getSummary = function(filter) {
    return Promise.all([
			getTotalSales(filter),
			getTopSale(filter),		
			getTopClient(filter),
			getLatestSale(filter),
			getSaleCount(filter)
    ]);
  }

	// get total sales by rep
  service.getRepPerformance = function() {
		return (new Query())
			.select(['rep', 'amount'])
			.groupBy(['rep'])
			.fetch('sales');
  }

	// get total sales by month
  service.getSalesPerformance = function(filter) {
		var query = (new Query())
			.select(['date', 'amount'])
			.dateGrain('date', 'month');

		if (filter) query.where('rep').equals(filter);

		return query.fetch('sales');
  }

  return service;
})(domo, Query);
