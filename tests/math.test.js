const { calTip, FtoC, CtoF } = require("../src/math");

test("Should Calculate total with tip", () => {
	const total = calTip(10, 0.3);
	expect(total).toBe(13);
});

test("Should clculate total with defualt tip", () => {
	const total = calTip(10);
	expect(total).toBe(12.5);
});

test("Should convert 32 F to 0 C", () => {
	const tmp = FtoC(32);
	expect(tmp).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
	const tmp = CtoF(0);
	expect(tmp).toBe(32);
});
