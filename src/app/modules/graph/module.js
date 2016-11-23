(function() {
	'use strict'

	angular
		.module('esTester.modules.graph', [

		])
		.config(config);

	function config($stateProvider) {
		$stateProvider
			.state('graph', {
				url: '/graph',

				views: {
					'': {
						templateUrl: 'app/modules/graph/common/template.html',
					}
				}
			})
			.state('graph.byTime', {
				url: '/byTime',
				views: {
					'': {
						templateUrl: 'app/modules/graph/byTime/template.html',
						controller: 'GraphByTimeCtrl',
						controllerAs: '$ctrl'
					}
				}
			})
			.state('graph.growing', {
				url: '/growing',
				views: {
					'': {
						templateUrl: 'app/modules/graph/growing/template.html',
						controller: 'GraphGrowingCtrl',
						controllerAs: '$ctrl'
					}
				}
			})
		;
	}
})();
