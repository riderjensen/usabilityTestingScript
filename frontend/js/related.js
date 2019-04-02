const OURURL = 'http://localhost:8080/replay/findOne/'

const genButton = document.getElementById('getTests');
const genInput = document.getElementById('scriptId');

const returnInfo = document.getElementById('returnInfo');

genButton.addEventListener('click', () => {
	// check to make sure item is not empty here THEN
	fetch(`http://localhost:8080/replay/${genInput.value}`, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
	}).then(response => response.json())
		.then(resp => {
			// display list of all tests as clickable to http://localhost:8080/replay/findOne/${resp[i]}
			let textGen = `<p>A total of ${resp.tests.length} tests have been generated. More information can be found here:</p>
				<textarea style="width: 500px;">
					<span id="usableID">{YOUR ID HERE}</span>
					<script src="http://localhost:8080/js/replay"></script>
				</textarea>
			<ul>`;
			for (let i = 0; i < resp.tests.length; i++) {
				textGen += `<li><a href="${OURURL}${resp.tests[i]}">${resp.tests[i]}</a></li>`
			}
			textGen += '</ul>'
			returnInfo.innerHTML = textGen;
		})
})