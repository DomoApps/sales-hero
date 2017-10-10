var DataService = (function(domo, Query) {
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

  function getRepPerformance(datefilter) {
  	// TODO: replace with domo.js query
  	return Promise.resolve([
  		{ rep: 'Darth Vader', avatar: 'assets/avatar.jpg', amount: 226000},
  		{ rep: 'Yoda', avatar: 'assets/avatar.jpg', amount: 200000},
  		{ rep: 'Kara Nezuma', avatar: 'assets/avatar.jpg', amount: 199000},
  		{ rep: 'Delos Joyriak', avatar: 'assets/avatar.jpg', amount: 195600},
  		{ rep: 'Myles Rayley', avatar: 'assets/avatar.jpg', amount: 192000},
  		{ rep: 'Sel Sage', avatar: 'assets/avatar.jpg', amount: 180000},
  		{ rep: 'Testa Green', avatar: 'assets/avatar.jpg', amount: 175200},
  		{ rep: 'Rogen Wendin', avatar: 'assets/avatar.jpg', amount: 173629},
  		{ rep: 'Bail Ta\'em', avatar: 'assets/avatar.jpg', amount: 120630},
  		{ rep: 'Trins Bardok', avatar: 'assets/avatar.jpg', amount: 90520}
  	]);
  }

  function getSalesPerformance(datefilter) {
  	// TODO: replace with domo.js query
  	return Promise.resolve([
  		{ date: '2017-03-12', amount: 100000 },
  		{ date: '2017-03-13', amount: 150500 },
  		{ date: '2017-03-14', amount: 168360 },
  		{ date: '2017-03-15', amount: 175000 },
  		{ date: '2017-03-16', amount: 189440 },
  		{ date: '2017-03-17', amount: 262360 },
  		{ date: '2017-03-18', amount: 265300 }
  	]);
  }

  return {
    getSummary: getSummary,
    getRepPerformance: getRepPerformance,
    getSalesPerformance: getSalesPerformance
	};
})(domo, Query);
