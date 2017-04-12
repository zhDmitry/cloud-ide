const contains = (key, list) => {
    return list.indexOf(key) > -1;
}

const diff = (first, second) => {
	let firstKeys = Object.keys(first);
	let secondKeys = Object.keys(second);

	let addition = secondKeys.filter(key => !contains(key, firstKeys))
	let deletion = firstKeys.filter(key => !contains(key, secondKeys))

	return {addition, deletion}
}

let first = {'lorem': 1, 'ipsum': 2};
let second = {'dolor': 3, 'sit': 4, 'lorem': 1};

console.log('first object')
console.log(first)

console.log('second object')
console.log(second)

console.log('diff')
console.log(diff(first, second))
