class PMHelper{
	constructor() {
		this.objectProto = Object.prototype;
		this.hasOwnProperty = this.objectProto.hasOwnProperty;
		this.toString = Object.prototype.toString;

		
	}

	eq(value, other) {
		return value === other || (value !== value && other !== other)
	}

	defaults(object, ...sources) {
		object = Object(object)
		sources.forEach((source) => {
			if (source != null) {
			source = Object(source)
			for (const key in source) {
				const value = object[key]
				if (value === undefined ||
					(this.eq(value, this.objectProto[key]) && !this.hasOwnProperty.call(object, key))) {
					object[key] = source[key]
				}
			}
			}
		})
		return object
	}

	isUndefined(value) {
		return value === undefined
	}
	
	map(array, iteratee) {
		let index = -1
		const length = array == null ? 0 : array.length
		const result = new Array(length)
		
		while (++index < length) {
			result[index] = iteratee(array[index], index, array)
		}
		return result;
	}

	isEmpty(value) {
		if (value == null) {
			return true
		}
		if (isArrayLike(value) &&
			(Array.isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
				isBuffer(value) || isTypedArray(value) || isArguments(value))) {
			return !value.length;
		}
		const tag = getTag(value)
		if (tag == '[object Map]' || tag == '[object Set]') {
			return !value.size;
		}
		if (isPrototype(value)) {
			return !Object.keys(value).length;
		}
		for (const key in value) {
			if (this.hasOwnProperty.call(value, key)) {
				return false;
			}
		}
		return true;
	}

}

export default PMHelper;