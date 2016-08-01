/**
 * Created by Alafi on 1/8/2016.
 */


var GameOfLife = function (params) {
    var cols;
    var rows;
    var mainMatrix;
    var tempMatrix;
    var canvas;
    var INTERVAL_ID;
    if (!params.matrix && (!params.columns || !params.rows)) return null;
    if (params.matrix && params.matrix.length == 0) return null
    initialize();

    ///////////////////////////////public methods////////////////////////////
    this.getMatrix = function(){
        return mainMatrix;
    }

    this.updateMatrix = function () {
        updateMatrix.call(this);
    }

    ///////////////////////////////private methods////////////////////////////

    function initialize(){
        canvas = $("#container")[0].getContext("2d");
        if (params.showMatrix) createButtonEvent.call(this);
        if (params.matrix){
            cols = params.matrix[0].length;
            rows = params.matrix.length;
            mainMatrix = params.matrix;
        } else { // create new matrix and set random numbers
            cols = params.columns;
            rows = params.rows;
            mainMatrix = createZeroMatrix(rows, cols);
            fillRandomNumbersToMatrix();
        }
        wrapMatrixWithZeros();
        tempMatrix = createZeroMatrix(rows + 2 ,cols + 2);
    }

    function createButtonEvent () {
        $("#action").click(function (event) {
            var action = event.target.value;
            if (action == "Stop") {
                $("#action").attr('value', 'Start');
                clearInterval(INTERVAL_ID);
            } else {
                INTERVAL_ID = setInterval(drawAndUpdateStateOfMatrix , 300);
                $("#action").attr('value', 'Stop');
            }
        });
    }

     function drawAndUpdateStateOfMatrix () {
        drawBoard();
        updateMatrix();
    }

    function createZeroMatrix(rows, cols) {
        var array = [], row = [];
        while (cols--) row.push(0);
        while (rows--) array.push(row.slice());
        return array;
    }

    function wrapMatrixWithZeros () {
        for (var i = 0; i < rows; i++) {
            mainMatrix[i].push(0);
            mainMatrix[i].unshift(0);
        }
        var newRow = FilledArrayWithValue (mainMatrix[0].length,0);
        mainMatrix.unshift(newRow);
        mainMatrix.push(newRow);
    }

    function FilledArrayWithValue(length, val) {
        var array = [];
        for (var i = 0; i < length; i++) {
            array[i] = val;
        }
        return array;
    }

    function fillRandomNumbersToMatrix() {
        var percentRows = Math.round((20 * rows)/ 100);
        var percentCols = Math.round((20 * cols)/ 100);
        for (var j = percentRows; j < rows - percentRows; j++) {
            for (var k = percentCols; k < cols - percentCols ; k++) {
                mainMatrix[j][k] = Math.round(Math.random());
            }
        }
    }

   function drawBoard() {
        for (var j = 1; j <= rows ; j++) {
            for (var k = 1; k <= cols ; k++) {
                canvas.beginPath(); // start draw
                canvas.rect(j * 10, k * 10, 10, 10); // size of slot
                canvas.strokeStyle = 'black'; // color of slot border
                canvas.stroke();
                if (mainMatrix[j][k] === 1) {
                    canvas.fillStyle = 'red'; // color slot fill
                    canvas.fill();
                } else {
                    canvas.fillStyle = 'white';
                    canvas.fill();
                }
            }
        }
    }

    function updateMatrix() { //sum 8 live neighbors and change live/dead by the rules
        for (var j = 1; j <= rows  ; j++) {
            for (var k = 1; k <= cols ; k++) {
                var totalCells = 0;
                totalCells += mainMatrix[j - 1][k - 1];
                totalCells += mainMatrix[j - 1][k] ;
                totalCells += mainMatrix[j - 1][k + 1];
                totalCells += mainMatrix[j][k - 1];
                totalCells += mainMatrix[j][k + 1];
                totalCells += mainMatrix[j + 1][k - 1];
                totalCells += mainMatrix[j + 1][k];
                totalCells += mainMatrix[j + 1][k + 1];
                switch (totalCells) {
                    case 2:
                        tempMatrix[j][k] = mainMatrix[j][k];

                        break;
                    case 3:
                        tempMatrix[j][k] = 1;

                        break;
                    default:
                        tempMatrix[j][k] = 0;
                }
            }
        }
        // swap matrix , the changes of rules saved on temp matrix.
        var temp = mainMatrix;
        mainMatrix = tempMatrix;
        tempMatrix = temp;
    }
}

var game = new GameOfLife({columns:50, rows:50, showMatrix:true});
