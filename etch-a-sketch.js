// Get references to the HTML elements I need.

const gridContainer = document.getElementById('grid-container');
const resetButton = document.getElementById('reset-button');

// Define the total width of the container (to match the CSS)

const CONTAINER_WIDTH = 960;

/* Creates a grid of squares inside the grid-container.
The number of squares for one side (here 16 for a 16X16 grid). */

function createGrid(squaresPerSide) {
    gridContainer.innerHTML = ''; // Clear any existing grid squares.

    const squareSize = CONTAINER_WIDTH / squaresPerSide; //Calculate the size of each square, divided the total container width by the number of squares.

    const totalSquares = squaresPerSide * squaresPerSide; // Calculate the total number of squares needed.

    // Loop to create and append all squares.
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div'); //Create a new div.

        square.classList.add('grid-square'); // Add the CSS class.

        //Set the dynamic width and height.
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Add the "hover" Event Listener to change color.
        square.addEventListener('mouseover', changeColor);

        // Append the new square to the container.
        gridContainer.appendChild(square);
    }
}

function changeColor(e) {
    // e.target refers to the specific div that was hovered over.
    
    e.target.style.backgroundColor = '#510be8ff';
}

// Prompts the user for a new grid size and generates it.

function promptsForNewGrid() {
    // Ask the user for input.
    let userInput = prompt("Enter number of squares per side (1-100:");

    // Convert the input string to a number.
    let newSize = parseInt(userInput);

    // Validate the input.
    if (isNaN(newSize)) {
        // User entered something that's not a number.
        alert("Invalid input. Please enter a number.");
        return; // Stop the function.
    }
    
    if (newSize < 1 || newSize > 100) {
        // User entered a number outside the allowed range.
        alert("Please enter a number between 1 and 100.");
        return; // Stop the function.
    }

    // If input is valid, create the new grid.
    createGrid(newSize);
}

// --- Program Start ---

// Add the click event listener to the button.
resetButton.addEventListener('click', promptsForNewGrid);

// Create the initial 64X64 grid when the page loads.
createGrid(64);