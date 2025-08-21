// IMPORT ELEMENTS ! >:3 🌷

const numSquaresInput = document.querySelector('input[type="text"]');
const createBtn = document.querySelector('button.create');
const mode = document.querySelector('ul.modes');
const leftSide = document.querySelector('div.left');
const container = document.querySelector('div.container');

//1. Check if input is valid, if there's none, announce
//2. When grid is created, add the "mouseenter/mouseover" event listener
//3. When mouse enters, the square changes its color
//4. When a different mode is clicked, remove the previous event listener
//4a. Add the new event listener for the new mode

// GLOBAL VARIABLES🌷

let numSquares = 0;

let randomColor = () => {
    const colorCode = Math.floor(Math.random() * 256);
    return colorCode;
}

let currentMode = 'random-colors'; //default
let rows;
let customColor;
let currentOpacity;

// GLOBAL FUNCTIONS 🌷

function addAnnouncement(parentElement, message) {
    const announcement = document.createElement('p')
    announcement.style.color = 'red';
    announcement.style.marginBottom = '20px';
    announcement.style.zIndex = '1';
    announcement.textContent = message;
    parentElement.insertBefore(announcement, container);
    setTimeout(() => parentElement.removeChild(announcement), 1000)
}

function checkIfValid() {
    if (numSquaresInput.value === '') {
        addAnnouncement(leftSide, 'You must enter a number first !');
    } else if (isNaN(numSquaresInput.value)) {
        addAnnouncement(leftSide, 'You must enter a number !!')
    } else if (Number(numSquaresInput.value) > 100 || Number(numSquaresInput.value) <= 0) {
        addAnnouncement(leftSide, 'Number must be less than 101 and greater than 0 !');
    }else {
        numSquares = Number(numSquaresInput.value);
        createGrid()
    }
}

function createGrid() {
    const childrenList = container.children
    
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    if (numSquares < 40) {
        container.style.maxWidth = '370px';
    } else if (numSquares < 50) {
        container.style.maxWidth = '500px';
    } else {
        container.style.maxWidth = '65vw';
    }

    for (let i=0; i<numSquares ; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j=0 ; j<numSquares ; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            row.appendChild(square);
            
            square.addEventListener('mouseover', () => {
                if (currentMode === 'eraser') {
                    square.style.opacity = 0.2;
                    square.style.backgroundColor = 'white';
                } else {
                    opacity = Number(square.style.opacity);
                    opacity += 0.2;
                    square.style.opacity = opacity > 1 ? 1 : opacity;
                    square.style.backgroundColor = changeDivColor();
                }
            })
        }
        container.appendChild(row);
    }
}

function changeDivColor() {
    if (currentMode === 'random-colors') {
        return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    } else if (currentMode === 'custom-color') {
        return customColor;
    } else if (currentMode === 'eraser') {
        return 'white';
    }
}

// EVENTS LISTENERS 🌷

createBtn.addEventListener('click', checkIfValid);

mode.addEventListener('click', (e) => {
    if (e.target.id === 'clear-all') {
        while (container.firstChild) {
        container.removeChild(container.firstChild);
        }
        numSquares = 0;
        currentMode = 'random-colors';
        customColor = '';

    } else if (e.target.id === 'custom-color') {
        customColor = prompt('Write a color or paste a color code here:').toLowerCase();
        currentMode = 'custom-color'

    } else if (e.target.id === 'random-colors') {
        currentMode = 'random-colors';

    } else if (e.target.id === 'eraser') {
        currentMode = 'eraser';
    }
});