const w = window.innerWidth;
const h = window.innerHeight;

const initInformation = {
	'browserType': browser(),
	'windowHeight': h,
	'windowWidth': w,
	'overallId': document.getElementById('usable').outerHTML.split('?id=')[1].split('"')[0]
}

postData(`http://localhost:8080/js`, initInformation)
	.then(data => {
		const RETURNED_ID = data.id;

		// ******************************
		// ****** Tracking Section ******
		// ******************************


		let x, y;
		let objectArray = [];
		let scrollOnPage = 0;

		// these are our event listeners for things we want to track
		window.addEventListener("scroll", usableScrolling);
		window.addEventListener("blur", usabelBlur);
		window.addEventListener("focus", usabelFocus);
		document.getElementById("usableBody").addEventListener("mouseup", usabelClicked);
		document.getElementById("usableBody").addEventListener("mousemove", usableShowCoords);


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

		function usabelBlur() {
			if (objectArray[objectArray.length - 1] != undefined) {
				objectArray[objectArray.length - 1].ev = 'blur';
			}
		}
		// ****** Focus ******

		function usabelFocus() {
			if (objectArray[objectArray.length - 1] != undefined) {
				objectArray[objectArray.length - 1].ev = 'focus';
			}
		}

		// ****** Click ******

		function usabelClicked() {
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

		// ****** Mouse Moves ******

		setInterval(function () {
			// start recording after modal is closed
			let object = screenPercents();
			if (objectArray.length > 10) {
				let sendObj = {
					recMoves: objectArray,
				};
				postData(`http://localhost:8080/js/${RETURNED_ID}`, sendObj)
					.then(data => console.log(data))
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
			postData(`http://localhost:8080/js/${RETURNED_ID}`, sendObj)
				.then(data => console.log(data))
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