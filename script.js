//Barbell plate calculator - Enter total working weight and return a visual representation
//of which plates are needed per side to get the target weight.
//
//


//Available plates
const weightAvailable = [45, 35, 25, 10, 5, 2.5, 1.25, 0.5];
const barWeight = 45;

//get user input of total weight through the button
let button = document.querySelector("button");
button.addEventListener("click", () => {
    clearScreen(); //clear previous output so it doesnt layer on top
    getWeight(); //start the calculation
    
});

//get user input by pressing ENTER key
let input = document.getElementById('weightInput');
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('button').click();
    }

});


//Takes uer total weight and subtracts the barbell weight, then devides by 2 to get weight per side. 
function getWeight() {


    var inputWeight = document.getElementById("weightInput").value;
    if (inputWeight <= barWeight) {
        console.log("Enter more weight");
    } else {
        inputWeight = (inputWeight - barWeight) / 2;
        processWeight(inputWeight);
    }

}

//Takes weight per side and works through each available plate (45, 35, etc.) to get the combintation
function processWeight(weight) {
    let weightX = weight;
    let answer;
    let offset = 0;


    for (let i = 0; i < weightAvailable.length; i++) {
        answer = weightX / weightAvailable[i];
        answer = Math.floor(answer);

        weightX = weightX - answer * weightAvailable[i];

        if (answer != 0) {
            console.log("Plate - " + weightAvailable[i] + ": " + answer);

            drawPlates(weightAvailable[i], offset, answer);

            for (let i = 0; i < answer; i++) {
                offset = offset + 35;
            }
        }
    }



        
}


//Visual representation of weights needed per side to get total weight
function drawPlates(whichPlate, offset_x, numPlates) {
    var canvas = document.getElementById('drawPlates');
    var ctx = canvas.getContext('2d');

    let x_rect = 0;
    let y_rect = 0;
    let h_plate = 30;
    let w_plate = 100;

    let text = whichPlate;
    let x_text = 16;
    let y_text = 60;

    let offset = offset_x;

    for (let i = 0; i < numPlates; i++) {
        ctx.beginPath();
        ctx.fillRect(x_rect + offset, y_rect, h_plate, w_plate);
		ctx.strokeStyle = "#FFB6C1";
        ctx.stroke();

        if (text < 5) {
            ctx.font = '10px Poppins';
            ctx.textAlign = 'center';
            ctx.strokeText(text, x_text + offset, y_text - 3);
            

        } else {
            ctx.font = '20px Poppins';
            ctx.textAlign = 'center';
            ctx.strokeText(text, x_text + offset, y_text);

        }

        offset = offset + 35;
    }



}


//clears previous search before drawing new combination 
function clearScreen() {
    var canvas = document.getElementById('drawPlates');
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
