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
	
	function getSummary(datefilter) {
    return Promise.all([
 	  	// TODO: replace with domo.js queries
    	Promise.resolve({ label: 'Summary 1', value: 30002550 }),
    	Promise.resolve({ label: 'Summary 2', value: 1520 }),
    	Promise.resolve({ label: 'Summary 3', value: 596 }),
    	Promise.resolve({ label: 'Summary 4', value: 235 }),
    	Promise.resolve({ label: 'Summary 5', value: 1500 })
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
