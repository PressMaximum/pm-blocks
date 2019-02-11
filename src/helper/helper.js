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
		return( !this.isUndefined(value) && null !== value );
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

	uniqueID(){
		function chr4() {
			return Math.random()
				.toString(16)
				.slice(-4);
		}
		let date = new Date();
		return (
			chr4() +
			chr4() +
			"-" +
			chr4() +
			"-" +
			chr4() +
			"-" +
			chr4() +
			"-" +
			chr4() +
			chr4() +
			chr4() + 
			"_" + date.getTime()
		);
	}

	omitKeys(obj, keys) {
		var target = {}; 
		for (var i in obj) { 
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; 
			target[i] = obj[i]; 
		} 
		return target; 
	}

	arrayNotEmpty( arr ) {
		if ( Array.isArray(arr) && arr.length > 0 ) {
			return true;
		}
		return false;
	}
}

export default PMHelper;