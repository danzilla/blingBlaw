
const Test = (req, res, next) => {
	// Test 1
	let pageMessage = { 
		title:"Test", 
		message: "Test Test ", 
		checked: "false", 
		result: "Test Test Test Test" 
	};
	res.send({ pageMessage: pageMessage });
}


const Test2 = (req, res, next) => {
	// Test 2
	let pageMessage = { 
		title:"Test", 
		message: "Test Test ", 
		checked: "false", 
		result: "Test Test Test Test" 
	};
	res.send({ pageMessage: pageMessage });
}

module.exports = {
	Test: Test,
	Test2: Test2
};



