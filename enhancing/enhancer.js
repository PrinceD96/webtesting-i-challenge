module.exports = {
	succeed,
	fail,
	repair,
	get
};

function succeed(item) {
	return item.enhancement === 20
		? item
		: { ...item, enhancement: item.enhancement + 1 };
}

function fail(item) {
	item =
		item.enhancement < 15
			? {
					...item,
					durability: item.durability - 5
			  }
			: {
					...item,
					durability: item.durability - 10
			  };

	item =
		item.enhancement > 16
			? {
					...item,
					enhancement: item.enhancement - 1
			  }
			: item;

	const finalItem = {
		...item,
		enhancement: item.enhancement < 0 ? 0 : item.enhancement,
		durability: item.durability < 0 ? 0 : item.durability
	};

	console.log(finalItem);

	return finalItem;
}

function repair(item) {
	return { ...item, durability: 100 };
}

function get(item) {
	return item.enhancement === 0
		? item
		: { ...item, name: `[+${item.enhancement}] ${item.name}` };
}
