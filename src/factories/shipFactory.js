export const ship = (length, name="default") =>{

	let hit_array = [];
	for(let i=0; i<length; i++){
		hit_array.push(false);
	}

	const hit = (number) =>{
		if ((number > length-1) || (number < 0))
			return
		hit_array[number] = true;
	};
	
	const isSunk = () =>{
		for(let i=0; i<length; i++){
			if (hit_array[i] == false)
				return false
		}
		return true
	};

	return {name, length, hit, isSunk}
}