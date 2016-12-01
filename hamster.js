/*
            o_
         .-"  ".
 bmw   ."    _-'-""--o
      J    ,"" _      ".
   .-",___,)____)___),-'
*/

var Hamster = {
	run: function(oNode) {
		/* RUN AROUND AND BREAK THINGS */
		var that = this;
		this.traverse(oNode, 0).then(function() {
			window.setTimeout(function() {
				that.run(oNode);
			}, 10);
		});
	},

	traverse: function(oObject, iDepth) {
		return new Promise(function(resolve) {
			var sKey, aFunctions, aChilds, oChild, oFunctionCalled,
				that = this;

			window.console.log("Level " + iDepth);

			aFunctions = [];
			aChilds = [];

			for (sKey in oObject) {
				if (oObject.hasOwnProperty && oObject.hasOwnProperty(sKey)) {
					oChild = oObject[sKey];
					if (typeof oChild === "function" &&
							!(/\{\s*\[native code\]\s*\}/).test("" + oChild)) { // check for native functions
						aFunctions.push(oChild);
					} else if (typeof oChild === "object" && !!oChild /* for null n'stuff */ &&
							!(oChild instanceof HTMLElement /* ignore DOM elements for now*/)) {
						aChilds.push(oChild);
					}
				}
			}

			if (aFunctions.length && this.getRandomInt(0, 50) > 10) { // Execute one of those functions?
				oFunctionCalled = this.callFunction(oObject, this.chooseFromArray(aFunctions));
			} else {
				oFunctionCalled = Promise.resolve();
			}

			oFunctionCalled.then(function() {
				if (aChilds.length && that.getRandomInt(0, 50) > 10) { // Go Deeper?
					window.setTimeout(function() {
						that.traverse(that.chooseFromArray(aChilds), iDepth + 1)
							.then(function() {
								that.traverse(oObject, iDepth) // stay on level
									.then(resolve); // afterwards go up
							});
					}, 0);
				} else { // Go up
					resolve();
				}
			});
		}.bind(this));
	},

	getRandomInt: function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getDecision: function() {
		return !!this.getRandomInt(0, 1);
	},

	chooseFromArray: function(arr) {
		var i = this.getRandomInt(0, arr.length - 1);
		return arr[i];
	},

	callFunction: function(oThis, functionToCall) {
		return new Promise(function(resolve) {
			var aArguments = this.buildArguments(functionToCall.length);
			try {
				window.console.log("Calling function '" + functionToCall.name + "' with arguments " + aArguments.join());
				functionToCall.apply(oThis, aArguments);
			} catch (err) {
				// pffft
				window.console.warn(err);
			}
			window.setTimeout(resolve, 10);
		}.bind(this));
	},

	buildArguments: function(iLength) {
		var aArguments = [], i;
		for (i = iLength - 1; i >= 0; i--) {
			aArguments.push(this.getRandomVariable());
		}
		return aArguments;
	},

	getRandomVariable: function() {
		var i = this.getRandomInt(0, 4);
		switch (i) {
		case 0:
			return "pony";
		case 1:
			return 42;
		case 2:
			return {
				pony: 42
			};
		case 3:
			return ["pony", 42];
		case 4:
			var elements = document.body.querySelectorAll("*");
			return elements[this.getRandomInt(0, elements.length - 1)];
		}
	}
};

Hamster.run(window);
