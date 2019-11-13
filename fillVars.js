/**
* Dynamic variable filling code like seen in Angular and other frameworks.
* @author Ali Furkan YILDIZ <casperafy@gmail.com>
* @param {Object} vars - Variable list to use to replace regex matches, can be get/set with [fillVarsInstance].varlist
* @param {string} cssSelector - CSS DOM selector to use for retrieving elements, can be get/set with [fillVarsInstance].eSelector
* @param {RegExp} regex - Regex filter to use for detecting variables, can be get/set with [fillVarsInstance].rSelector
* @constructor
*/
function fillVars(vars, cssSelector, regex) { // Constructor for dynamic variable filling.
	String.prototype.replaceAll = function (r, t) { // Required function.
		return this.replace(new RegExp(r, "g"), t)
	};
	this.varlist = vars || {}; // Variable list "varlist"
	this.eSelector = cssSelector || "[fill-vars]"; // Element selector (CSS) "eSelector"
	this.rSelector = regex || /{{[a-zA-Z_$][a-zA-Z_$0-9]*}}/g; // Regex selector "rSelector"
	let elements = []; // Element list.
	this.fill = () => { // Start filling process. Returns interval ID.
		if (elements.length == 0) { // Check if it needs a scan.
			this.scan(); // Scan for elements.
			return this.fill(); // Restart filling process.
		}
		return setInterval(() => { // Interval for the filling process.
			elements.forEach(x => { // Do checks and replacements in element list.
				x.tempText = x.origText;
				x.origText.match(this.rSelector).forEach(y => { // Retrieve replacement list and process it.
					let val;
					try {
						val = eval("this.varlist." + (y.slice(2, -2))); // Try to find variable in varlist.
					} catch { }
					if (typeof val != "undefined") { // If the variable exits,
						x.tempText = x.tempText.replaceAll(y, val); // Replace the values in the tempText.
					}
				});
				x.element.innerHTML = x.tempText; // Replace element innerHTML with tempText.
			});
		}, 100);
	}
	this.scan = () => { // Checks for elements that fit into eSelector and rSelector, then adds them to a list.
		elements = []; // Reset element list
		document.querySelectorAll(this.eSelector).forEach(x => { // Get all elements that fit into eSelector.
			x.innerHTML.match(this.rSelector).forEach(() => { // Filter out all elements that doesn't fit into rSelector for performance.
				elements.push({ // Finally, add them to the list.
					element: x,
					origText: x.innerHTML
				});
			});
		});
	}
}