(function() {

	angular.module('esTester.modules.admin.edit', [

	])
	.controller('EditController', EditController);

	function EditController($localStorage, $stateParams, $state) {
		var self = this;

		console.log('we are in');
	    self.quest = $stateParams.quest;
	    self.test = $localStorage.allTests[self.quest];

	    self.saveEditTest = function(test) {
/*    		$localStorage.allTests.splice(self.quest, 1);
	    	$localStorage.allTests.push(test);*/

	    	delete $localStorage.allTests[self.quest];
	    	$localStorage.allTests[self.quest] = test;
	    	$state.go('admin');
	    }

	    self.addVariant = function(quest) {
			self.test.questions[quest].variants.push('');
			console.log(quest);
		}

		self.addQuestion = function() {
			self.test.questions.push({
				variants: ['','']
			});
		}
	}

})();