const { get, repair, succeed, fail } = require("./enhancer.js");
// test away!

let item = { name: "Hulk", enhancement: 14, durability: 80 };

describe("repair()", () => {
	it("restores durability to 100", () => {
		expect(repair(item)).toEqual({ ...item, durability: 100 });
	});
});

describe("succeed()", () => {
	it("enhancement increases by 1", () => {
		expect(succeed(item)).toEqual({
			...item,
			enhancement: item.enhancement + 1
		});
	});

	it("enhancement === 20 ? enhancement remains untouched", () => {
		expect(succeed({ ...item, enhancement: 20 })).toEqual({
			...item,
			enhancement: 20
		});
	});

	it("durability is never changed", () => {
		expect(succeed(item)).toEqual(expect.objectContaining({ durability: 80 }));
	});
});

describe("fail()", () => {
	it("enhancement < 15 ? durability decreases by 5", () => {
		expect(fail(item)).toEqual(
			expect.objectContaining({ durability: item.durability - 5 })
		);
	});

	it("enhancement >= 15 ? durability decreases by 10", () => {
		expect(fail({ ...item, enhancement: 15 })).toEqual(
			expect.objectContaining({ durability: item.durability - 10 })
		);
	});

	it("enhancement > 16 ? enhancement decreases by 1", () => {
		expect(fail({ ...item, enhancement: 18 })).toEqual(
			expect.objectContaining({ enhancement: 17 })
		);
	});
});

describe("get()", () => {
	it("enhancement === 0 ? name does not change", () => {
		expect(get({ ...item, enhancement: 0 })).toEqual(
			expect.objectContaining({ name: item.name })
		);
	});

	it("adds the enhancement before the name preceded by a plus sign(+)", () => {
		expect(get(item)).toEqual(
			expect.objectContaining({ name: `[+${item.enhancement}] ${item.name}` })
		);
	});
});
