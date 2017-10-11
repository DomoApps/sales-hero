var DataService = (function(domo, Query) {
	var isLoading = true;
	
	function getRepList() {
		return (new Query())
			.select(['rep'])
			.groupBy(['rep'])
			.orderBy('rep')
			.fetch('sales')
			.then(function(data) {
				return data.map(function(row) { return row.rep; });
			});
	}

	function getTotalSales(filter) {
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

	function getTopSale(filter) {
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

	function getLatestSale(filter) {
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

	function getSaleCount(filter) {
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

	function getTopClient(filter) {
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
	
	function getSummary(filter) {
    return Promise.all([
			getTotalSales(filter),
			getTopSale(filter),		
			getTopClient(filter),
			getLatestSale(filter),
			getSaleCount(filter)
    ]);
  }

  function getRepPerformance() {
		return (new Query())
			.select(['rep', 'amount'])
			.groupBy(['rep'])
			.fetch('sales');
  }

  function getSalesPerformance(filter) {
		var query = (new Query())
			.select(['date', 'amount'])
			.dateGrain('date', 'month');

		if (filter) query.where('rep').equals(filter);

		return query.fetch('sales');
  }

  return {
		getRepList: getRepList,
    getSummary: getSummary,
    getRepPerformance: getRepPerformance,
		getSalesPerformance: getSalesPerformance,
		isLoading: isLoading,
	};
})(domo, Query);
