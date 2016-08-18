/*

Test the #undef command


© 2016 - Guillaume Gonnet
License GPLv2

Source at https://github.com/ParksProjets/Compile-JS-like-C

*/


// Libraries
var compiler = require('../index.js'),
	vm = require('vm'),
	utils = require('./utils.js');


// Create the test
var test = utils.test('#undef');



// Results
var n1 = Math.round(Math.random() * 100),
	n2 = Math.round(Math.random() * 100);


// Code to parse
var str = `

var VARIABLE = ${n2};

#define VARIABLE ${n1}
var r1 = VARIABLE;

#undef VARIABLE
var r2 = VARIABLE;

`;




// Run the code and test it
function run(err, code) {

	// If there is a compiler error
	if (err)
		return test.error(`compiler error -> ${err}`);


	// Run the code
	try {
		var sandbox = {};
		vm.runInNewContext(code, sandbox);
	} catch(e) {
		return test.error(`code execution failed -> ${e.message}`);
	}


	// Results
	var r1 = sandbox.r1,
		r2 = sandbox.r2;

	// Test the results
	if (r1 == n1 && r2 == n2)
		test.success();
	else
		test.error(`the expected results were ${n1} and ${n2} but we got ${r1} and ${r2}`);
}




// Compile the code
try {
	compiler.compile(str, run);
} catch(e) {
	test.error(`compiler execution failed -> ${e.message}`);
}
