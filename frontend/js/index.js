const USABLE_URL = 'http://165.22.130.92'

const genButton = document.getElementById('genScriptTag');
const genInput = document.getElementById('scriptTag');
const addQuestions = document.getElementById('addQuestions');
const qustionArea = document.getElementById('questionArea');

genButton.addEventListener('click', () => {
	const questionArray = [];
	for (let i = 0; i < qustionArea.childNodes.length; i += 2) {
		qustionArea.childNodes[i].value !== "" ? questionArray.push(qustionArea.childNodes[i].value) : null;
	}

	let queryItems = {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
	}
	const bodyObj = {
		questionArray: questionArray
	}
	questionArray.length > 0 ? queryItems = {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bodyObj)
	} : null;
	fetch(`${USABLE_URL}`, queryItems).then(response => response.json())
		.then(resp => {
			genInput.value = `<script src="${resp.url}" id="usable"></script>`;
			genInput.addEventListener('click', () => {
				genInput.select();
				document.execCommand("copy");
				// show some item saying that the text was copied
			})
		})
});

addQuestions.addEventListener('click', () => {
	const input = document.createElement('input');
	input.setAttribute('class', 'form-control');
	input.setAttribute('value', '');
	const br = document.createElement('br');
	document.getElementById('questionArea').appendChild(input);
	document.getElementById('questionArea').appendChild(br);
});