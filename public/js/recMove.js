const w = window.innerWidth;
const h = window.innerHeight;
const body = document.getElementsByTagName('body')[0];
const USABLE_URL = 'https://intense-plains-47179.herokuapp.com';

let x, y;
let objectArray = [];
let scrollOnPage = 0;

const initInformation = {
	'browserType': browser(),
	'windowHeight': h,
	'windowWidth': w,
	'overallId': document.getElementById('usable').outerHTML.split('?id=')[1].split('"')[0],
	'url': window.location.href
}


postData(`${USABLE_URL}/js`, initInformation)
	.then(data => {
		const RETURNED_ID = data.id;
		const RETURNED_QUESTIONS = data.questions;

		RETURNED_QUESTIONS.length > 0 ? createModalArea(RETURNED_QUESTIONS, RETURNED_ID) : null;

		// these are our event listeners for things we want to track
		window.addEventListener("scroll", usableScrolling);
		window.addEventListener("blur", usableBlur);
		window.addEventListener("focus", usableFocus);
		body.addEventListener("mouseup", usableClicked);
		body.addEventListener("mousemove", usableShowCoords);


		// ****** Mouse Moves ******

		setInterval(function () {
			let object = screenPercents();
			if (objectArray.length > 50) {
				let sendObj = {
					recMoves: objectArray,
				};
				postData(`${USABLE_URL}/js/${RETURNED_ID}`, sendObj)
					.then(_ => console.log('posted something for regular'))
					.catch(error => console.log(error));

				// empty object array and begin again
				objectArray = [];
			}
			// push object to object array
			objectArray.push(object);
		}, 100);

		// get final information before page is taken away
		window.addEventListener('unload', () => {
			let sendObj = {
				recMoves: objectArray,
				endingScroll: window.pageYOffset
			};
			postData(`${USABLE_URL}/js/${RETURNED_ID}`, sendObj)
				.then(_ => console.log('posted something for unload'))
				.catch(error => console.log(error));
		});


	})
	.catch(error => console.log(error));


function postData(url, obj) {
	return fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj),
	}).then(response => response.json())

}

function browser() {
	// Return cached result if avalible, else get result then cache it.
	if (browser.prototype._cachedResult)
		return browser.prototype._cachedResult;

	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';

	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
		return p.toString() === "[object SafariRemoteNotification]";
	})(!window['safari'] || safari.pushNotification);

	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/ false || !!document.documentMode;

	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;

	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;


	return browser.prototype._cachedResult =
		isOpera ? 'Opera' :
		isFirefox ? 'Firefox' :
		isSafari ? 'Safari' :
		isChrome ? 'Chrome' :
		isIE ? 'IE' :
		isEdge ? 'Edge' :
		"Don't know";
};

// changing the x/y coords anytime that the mouse is moved
function usableShowCoords(event) {
	x = event.clientX;
	y = event.clientY;
}
// getting the x and y position in a percentage and returning the obj to the req
function screenPercents() {
	return object = {
		x: Math.round((x / w) * 10000) / 100,
		y: Math.round((y / h) * 10000) / 100
	}
}


// ****** Blur ******

function usableBlur() {
	if (objectArray[objectArray.length - 1] != undefined) {
		objectArray[objectArray.length - 1].ev = 'blur';
	}
}
// ****** Focus ******

function usableFocus() {
	if (objectArray[objectArray.length - 1] != undefined) {
		objectArray[objectArray.length - 1].ev = 'focus';
	}
}

// ****** Click ******

function usableClicked() {
	// setting event to clicked on the current arrayObj
	if (objectArray[objectArray.length - 1] != undefined) {
		objectArray[objectArray.length - 1].ev = 'clicked';
	}
}

// ****** Scroll ******

let doneOnce = false;
let scrollSeconds;
let myTimeout;
let startScroll;

function usableScrolling() {
	if (!doneOnce) {
		doneOnce = true;
		startScroll = document.documentElement.scrollTop;
		let scrollObj = {
			type: 'start',
			// where we started scrolling
			sScroll: scrollOnPage
		}
		// setting event to object on the scroll event
		if (objectArray[objectArray.length - 1] != undefined) {
			objectArray[objectArray.length - 1].ev = scrollObj;
		}
	}

	// wait a half of a second before resetting so that we can get a new scroll time
	clearTimeout(myTimeout);
	myTimeout = setTimeout(function () {
		doneOnce = false;
		scrollOnPage = document.documentElement.scrollTop;
		let scrollObj = {
			type: 'end',
			// where we ended scrolling
			eScroll: scrollOnPage
		}
		// setting event to object on the scroll event
		objectArray[objectArray.length - 1].ev = scrollObj;
	}, 100);
}



// ============= MODAL AREA ==============


function createModalArea(questionsArray, testId) {
	// Create outer div
	const outerDiv = document.createElement('div');
	outerDiv.setAttribute('id', 'taskModal');
	outerDiv.style.cssText = 'width: 500px; height: auto; border: 1px solid #ccc; box-sizing: border-box; border-radius: 10px; position: fixed; bottom: 40px; transition: .3s linear; z-index: 99; background: #fff; box-shadow: 1px 1px 2px #ccc';

	// Create header
	const usableLogoDiv = document.createElement('div');
	const usableLogo = document.createElement('img');
	usableLogo.setAttribute('src', 'https://agitated-fermi-28bdc8.netlify.com/img/usable_logo.f82721b1.svg');
	usableLogo.setAttribute('alt', 'Usable Logo');
	usableLogoDiv.appendChild(usableLogo);
	usableLogoDiv.style.cssText = 'display: flex; justify-content: center; width: 100%;  border-radius: 10px 10px 0 0; background: #000; padding: 10px 0; border: 1px solid #ccc;';

	outerDiv.appendChild(usableLogoDiv);

	// Create Min-Max Div
	const minMax = document.createElement('div');
	minMax.style.cssText = 'position: relative; float: right; width: 40px; height: 40px; right: -50px';

	// Create Min-Max Button
	const minMaxButton = document.createElement('div');
	minMaxButton.setAttribute('id', 'minMaxButton');
	minMaxButton.style.cssText = 'background: cyan; height: 100%; width: 100%; border-radius: 50px; display: flex; justify-content: center; align-items: center;';

	minMax.appendChild(minMaxButton);

	// Create Min-Max Span
	const minMaxSpan = document.createElement('span');
	minMaxSpan.textContent = '-'
	minMaxSpan.style.cssText = 'color: #fff; font-size: 2rem; display: inline-block;'

	minMaxButton.appendChild(minMaxSpan);


	outerDiv.appendChild(minMax);

	// Create H1
	const heading1 = document.createElement('h1');
	heading1.style.cssText = 'font-family: sans-serif; font-size: 21px; text-transform: uppercase; font-weight: 600; color: #333; margin-bottom: 15px; text-decoration: underline; padding-top: 16px; text-align: center; position: relative; right: -20px';
	outerDiv.appendChild(heading1);

	// Create Task Paragraph
	const taskParagraph = document.createElement('p');
	taskParagraph.setAttribute('id', 'taskItem');
	taskParagraph.style.cssText = 'line-height: 21px; padding: 15px; font-family: sans-serif;'
	outerDiv.appendChild(taskParagraph);

	// Input Box
	const feedback = document.createElement('textarea');
	feedback.style.cssText = 'padding: 15px; width: 75%; display: block; margin: 25px auto; border-radius: 3px;'
	feedback.setAttribute('placeholder', 'Give us some feedback about this task!');
	feedback.id = "usableUserResponseTextArea"
	outerDiv.appendChild(feedback);

	// Create Bottom Section
	const bottomSection = document.createElement('div');
	bottomSection.style.cssText = 'display: flex; border-top: 1px solid #aaa';

	// Create Next Button
	const nextButton = document.createElement('div');
	nextButton.textContent = 'Submit';
	nextButton.style.cssText = 'flex-grow: 1; padding: 10px; text-decoration: none; font-family: sans-serif; text-align: center; background: cyan; color: #fff; border-radius: 0 0 10px 0;';

	bottomSection.appendChild(nextButton);

	outerDiv.appendChild(bottomSection);

	// Append Entire Modal to Body
	document.querySelector('body').appendChild(outerDiv);

	const taskList = questionsArray[getRandomInt(0, questionsArray.length)];
	document.getElementById('taskItem').textContent = taskList;

	// Minimize and Maximize Modal
	const minMaxButtonEvent = document.getElementById('minMaxButton');
	minMaxButtonEvent.addEventListener('click', () => {
		if (minMaxSpan.textContent === '-') {
			outerDiv.style.cssText = 'width: 500px; height: auto; border: 1px solid #ccc; box-sizing: border-box; border-radius: 10px; position: fixed; bottom: 40px; transition: .3s linear; z-index: 99; left: -502px; background: #fff;';
			minMaxSpan.textContent = '+';
		} else {
			outerDiv.style.cssText = 'width: 500px; height: auto; border: 1px solid #ccc; box-sizing: border-box; border-radius: 10px; position: fixed; bottom: 40px; transition: .3s linear; z-index: 99; left: 0; background: #fff;';
			minMaxSpan.textContent = '-';
		}
	});

	minMaxButtonEvent.onmouseover = () => {
		minMaxButtonEvent.style.cssText = 'background: cyan; height: 100%; width: 100%; border-radius: 50px; display: flex; justify-content: center; align-items: center; transform: scale(1.1); transition: .2s; cursor: pointer;';
	};

	minMaxButtonEvent.onmouseleave = () => {
		minMaxButtonEvent.style.cssText = 'background: cyan; height: 100%; width: 100%; border-radius: 50px; display: flex; justify-content: center; align-items: center; transform: scale(1); transition: .2s;';
	};

	// Next Button
	nextButton.addEventListener('mouseover', (e) => {
		e.target.style.cssText = 'flex-grow: 1; padding: 10px; text-decoration: none; font-family: sans-serif; text-align: center; background: cyan; color: #fff; border-radius: 0 0 10px 0; cursor: pointer;';
	});

	nextButton.addEventListener('click', () => {
		let feedbackGet = document.getElementById('usableUserResponseTextArea').value;
		const questionObj = {
			question: taskList,
			answer: feedbackGet,
			testId: testId
		};
		//post feedbackGet to DB
		postData(`${USABLE_URL}/answerQuestion`, questionObj)
			.then(data => {
				console.log(data)
				//remove the modal from the DOM
				outerDiv.remove();
			})

	});
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}