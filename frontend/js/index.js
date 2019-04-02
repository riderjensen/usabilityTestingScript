const genButton = document.getElementById('genScriptTag');
const genInput = document.getElementById('scriptTag');

genButton.addEventListener('click', () => {
	fetch('http://165.22.130.92', {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
		}).then(response => response.json())
		.then(resp => {
			genInput.value = `<script src="${resp.url}" id="usable"></script>`;
			genInput.addEventListener('click', () => {
				genInput.select();
				document.execCommand("copy");
				// show some item saying that the text was copied
			})
		})
})