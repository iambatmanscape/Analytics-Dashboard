export const fetchData = async ()=> {
	const api = 'http://localhost:3000/';
	try {
		const response = await fetch(api);
		const responseData = await response.json();
		return responseData;
	} catch(e) {
		
		console.log(e);
	}
}