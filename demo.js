var objectsList = [];

document.addEventListener('DOMContentLoaded', function () {

	const windowWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	const windowHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

	// settings
	const containerWidth = windowWidth - 20;
	const containerHeight = windowHeight - 20;

	const distance = 30;

	// Add container to page
	const namespace = 'http://www.w3.org/2000/svg';

	const containerElement = document.createElementNS(namespace, 'svg');
	containerElement.setAttribute('viewBox', '0 0 ' + containerWidth + ' ' + containerHeight);
	containerElement.setAttribute('xmlns', namespace);
	containerElement.setAttribute('width', containerWidth);
	containerElement.setAttribute('height', containerHeight);
	
	let groupPoints = document.createElementNS(namespace, 'g');
	groupPoints.setAttributeNS(null, 'id', 'points');
	containerElement.appendChild(groupPoints);

	let groupLines = document.createElementNS(namespace, 'g');
	groupLines.setAttributeNS(null, 'id', 'lines');
	containerElement.appendChild(groupLines);

	document.body.appendChild(containerElement);

	// start sampling
	var sampler = new PoissonDiskSampler(containerWidth, containerHeight, distance, distance);
	var solution = sampler.sampleUntilSolution();

	// delayed output on screen for a nice effect
	let timer = setInterval(function() {

		let sample = sampler.outputList.pop();

		sampler.grid.drawPoint(sample, '#c00', containerElement);

		if (sampler.outputList.length <= 0) {
			clearInterval(timer);
		}

	}, 0.15);
});

Grid.prototype.drawPoint = function(point, color, canvas) {

	let x = point.x.toFixed(2);
	let y = point.y.toFixed(2);
	let id = window.objectsList.length + 1;

	let pointElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	pointElement.setAttributeNS(null, 'cx', x);
	pointElement.setAttributeNS(null, 'cy', y);
	pointElement.setAttributeNS(null, 'r', 2);
	pointElement.setAttributeNS(null, 'data-id', id);
	pointElement.setAttributeNS(null, 'fill', color);

	canvas.querySelector('#points').appendChild(pointElement);

	let safety = 0;
	for (circle of window.objectsList) {
		
		const targetX = circle.getAttribute('cx');
		const targetY = circle.getAttribute('cy');

		const xDiff = targetX - x; 
		const yDiff = targetY - y;

		const distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);

		if (distance < 60) {
			let lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			lineElement.setAttributeNS(null, 'x1', x);
			lineElement.setAttributeNS(null, 'y1', y);
			lineElement.setAttributeNS(null, 'x2', targetX);
			lineElement.setAttributeNS(null, 'y2', targetY);
			lineElement.setAttributeNS(null, 'data-for', id);
			lineElement.setAttributeNS(null, 'stroke', '#000');
			canvas.querySelector('#lines').appendChild(lineElement);

			safety += 1;
		}

		if (safety > 25) break;
	}

	window.objectsList.push(pointElement);
}
