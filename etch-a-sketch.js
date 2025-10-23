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
        square.addEventListener('mouseover', progressiveColoring);

        // Append the new square to the container.
        gridContainer.appendChild(square);
    }
}

// Event listener function to apply a random color on the first.
// pass and increase its opacity on subsequent passes.

function progressiveColoring(e) {
    // e.target refers to the specific div that was hovered over.
    const square = e.target;

    // Check if the base color is already stored on the element.
    if (!square.dataset.rgb) {
        // -- First Interaction --

        // Generate random R, G, B, Values.
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Store these base values in a data attribute.
        // This lets us remember the color for future hovers.
        square.dataset.rgb = `${r},${g},${b}`;

        // Set the background color with 10% alpha (opacity).
        square.style.backgroundColor = `rgba(${r},${g},${b}, 0.1)`;

        // Store the current alpha (opacity) level.
        square.dataset.alpha = 0.1;
    } else {
        // -- Subsequent Interactions --
        // Get the current alpha level from the data attribute.
        let currentAlpha = parseFloat(square.dataset.alpha);

        // Only proceed if it's not yet fully opaque.
        if (currentAlpha < 1) {
            // Increase alpha by 0.1, and cap it at 1.
            // Using Math.min here ti prevent it from going over 1.
            let newAlpha = Math.min(1, currentAlpha + 0.1);

            // Get the stored base color.
            const baseColor = square.dataset.rgb;

            // Set the new background color with the new alpha.
            square.style.backgroundColor = `rgba(${baseColor}, ${newAlpha})`;

            // Update the stored alpha value for the next hover.
            square.dataset.alpha = newAlpha;
        }
    }
}

// Prompts the user for a new grid size and generates it.

function promptsForNewGrid() {
    // Ask the user for input.
    let userInput = prompt("Enter number of squares per side (1-100:");

    // Convert the input string to a number.
    let newSize = parseInt(userInput);

    // Validate the input.
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        // User entered something that's not a number or not in between 1 and 100.
        alert("Invalid input. Please enter a number between 1 and 100.");
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