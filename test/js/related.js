const genButton = document.getElementById('getTests');
const genInput = document.getElementById('scriptId');


genButton.addEventListener('click', () => {
	// check to make sure item is not empty here THEN
	fetch(`http://localhost:8080/replay/${genInput.value}`, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
	}).then(response => response.json())
		.then(resp => {
			console.log(resp)
			// display list of all tests as clickable to http://localhost:8080/replay/findOne/${resp[i]}
		})
})