export function uniqueID(){
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
};
export const pmUniqueID = uniqueID();