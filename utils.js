// utils.js
function generateRandom2DArray(rows, cols, min, max) {
    const array = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
            row.push(randomValue);
        }
        array.push(row);
    }
    return array;
}

// Function to map terrain height to a color
function getTerrainColor(value, minVal, maxVal) {
    // Normalize the value to a range of 0-1
    const normalizedValue = (value - minVal) / (maxVal - minVal);

    // Define color stops for the gradient
    const waterColor = [0, 0, 255]; // Blue for low terrain (water)
    const landColor = [34, 139, 34]; // Green for mid terrain (land)
    const mountainColor = [139, 69, 19]; // Brown for high terrain (mountains)
    const snowColor = [255, 255, 255]; // White for very high terrain (snow)

    // Interpolate between colors based on the normalized value
    if (normalizedValue < 0.25) {
        // Water to land transition
        return interpolateColor(waterColor, landColor, normalizedValue / 0.25);
    } else if (normalizedValue < 0.75) {
        // Land to mountain transition
        return interpolateColor(landColor, mountainColor, (normalizedValue - 0.25) / 0.5);
    } else {
        // Mountain to snow transition
        return interpolateColor(mountainColor, snowColor, (normalizedValue - 0.75) / 0.25);
    }
}


// Function to interpolate between two colors
function interpolateColor(color1, color2, factor) {
    const result = color1.slice(); // Start with color1
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}


function renderMap(terrainArray, enemy){
    noStroke();
    const rows = terrainArray.length;
    const cols = terrainArray[0].length;

    // Calculate cell size based on canvas dimensions
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    // Find the min and max values in the terrain array
    const minVal = Math.min(...terrainArray.flat());
    const maxVal = Math.max(...terrainArray.flat());
    //console.log("cell width and height: ", cellHeight, " ", cellWidth);  //100,100

    // Render each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const color = getTerrainColor(terrainArray[i][j], minVal, maxVal);  // returns a value like 'rgb(255,255,255)'
            // Draw the cell
            fill(color);         // rgb, fills the next shape with this color
            rect(j * cellWidth/2, i * cellHeight/2, cellWidth/2, cellHeight/2);   // x,y,w,h
        }
    }

    for (let i = 0; i<enemy.length; i++){
        fill('black');
        //circle(enemy[i][0] * cellWidth/2, enemy[i][1] * cellHeight/2, 5);
        circle(enemy[i][4]*cellWidth/2 + cellHeight/4, enemy[i][5]*cellHeight/2 + cellWidth/4, cellHeight/4);  //(x,y,d) x is center, y is center
    }
}









// the difficultly written fetch then code that returns a promise from api

    //fetchDataButton.addEventListener('click', () => {
    //  fetch('https://muze3k.pythonanywhere.com/Map') 
    //    .then(response => response.json())
    //    .then(data => {
          //dataContainer.innerHTML = ''; // Clear previous data

    //      const myList = data.data; // Extract the 'myList' from the dictionary
    //      return data.data;
          //const dataList = document.createElement('ul');
          //myList.forEach(item => {
          //  const listItem = document.createElement('li');
          //  listItem.textContent = item; // Assuming items in myList are strings
          //  dataList.appendChild(listItem);
          //});

          //dataContainer.appendChild(dataList);
    //    })
    //    .catch(error => {
    //      console.error('Error fetching data:', error);
    //      dataContainer.textContent = 'Error fetching data.';
    //    });
    //});