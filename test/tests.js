/**
 * Created by Alafi on 1/8/2016.
 */
var iCell = 2;
var jCell = 2;
var matrixAfterChange;

var cellStatus = {live:1, dead:0}

function initTestGameOfLife (matrix) {
    var testGameOfLife = new GameOfLife(matrix);
    testGameOfLife.updateMatrix();
    matrixAfterChange = testGameOfLife.getMatrix();
}

QUnit.test( "Check empty matrix", function( assert ) {
    var testGameOfLife = new GameOfLife({matrix:[]});
    assert.ok( $.isEmptyObject(testGameOfLife), "Passed!" );
});

QUnit.test( "Check matrix M X N", function( assert ) {
    initTestGameOfLife({matrix:[[0,0,0],[0,1,0]]});
    assert.ok( matrixAfterChange[iCell][jCell] == cellStatus.dead , "Passed!" );
});

QUnit.test( "Live cell should die with zero neighbors", function( assert ) {
    initTestGameOfLife({matrix:[[0,0,0],[0,1,0],[0,0,0]]});
    assert.ok( matrixAfterChange[iCell][jCell] == cellStatus.dead , "Passed!" );
});

QUnit.test( "Live cell should die with one neighbor", function( assert ) {
    initTestGameOfLife({matrix:[[0,1,0],[0,1,0],[0,0,0]]});
    assert.ok( matrixAfterChange[iCell][jCell] == cellStatus.dead , "Passed!" );
});

QUnit.test( "Live cell should live with two neighbors", function( assert ) {
    initTestGameOfLife({matrix:[[0,0,0],[1,1,1],[0,0,0]]});
    assert.ok( matrixAfterChange[iCell][jCell] == cellStatus.live , "Passed!" );
});

QUnit.test( "Live cell should live with three neighbors", function( assert ) {
    initTestGameOfLife({matrix:[[0,0,0],[1,1,1],[0,1,0]]});
    assert.ok( matrixAfterChange[iCell][jCell] == cellStatus.live , "Passed!" );
});

QUnit.test( "Live cell should die with more then three neighbors", function( assert ) {
    initTestGameOfLife({matrix:[[0,1,0],[1,1,1],[0,1,0]]});
    assert.ok( matrixAfterChange[iCell][jCell] == cellStatus.dead , "Passed!" );
});

QUnit.test( "Dead cell should become alive with three neighbors", function( assert ) {
    initTestGameOfLife({matrix:[[0,0,0],[1,0,1],[0,1,0]]});
    assert.ok( matrixAfterChange[iCell][jCell] == cellStatus.live , "Passed!" );
});
