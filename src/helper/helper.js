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

	notUndefinedNull( value ) {
		return this.isUndefined(value) && null !== value;
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

	mapObject(object, iteratee) {
		if( this.isUndefined(object) || null === object ) {
			return;
		}
		const props = Object.keys(object)
		const result = new Array(props.length)
		
		props.forEach((key, index) => {
			result[index] = iteratee(object[key], key, object)
		})
		return result
	}

}

export default PMHelper;