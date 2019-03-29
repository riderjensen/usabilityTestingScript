const genButton = document.getElementById('genScriptTag');
const genInput = document.getElementById('scriptTag');

genButton.addEventListener('click', () => {
	fetch('http://localhost:8080', {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
	}).then(response => response.json())
		.then(resp => {
			genInput.value = `<script src="${resp.url}"></script>`;
			genInput.addEventListener('click', () => {
				genInput.select();
				document.execCommand("copy");
				// show some item saying that the text was copied
			})
		})
})