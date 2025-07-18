import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./Inkoo'sPalette/scenes/MainMenu";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main(){
    // Run any tests
    runTests();

    // Set up options for our game
    let options = {
        canvasSize: {x: 1200, y: 800},          // The size of the game
        clearColor: {r: 150, g: 150, b: 150},   // The color the game clears to
        inputs: [
            {name: "up", keys: ["w"]},
            {name: "left", keys: ["a"]},
            {name: "right", keys: ["d"]},
            {name: "down", keys: ["s"]},
            {name: "jump", keys: ["space"]},
            {name: "attack", keys: ["j"]},
            {name: "pause", keys: ["escape"]},
            {name: "level1", keys: ["1"]},
            {name: "level2", keys: ["2"]},
            {name: "level3", keys: ["3"]},
            {name: "level4", keys: ["4"]},
            {name: "level5", keys: ["5"]},
            {name: "level6", keys: ["6"]},
            {name: "invincible", keys: ["i"]},
            {name: "dash", keys: ["shift"]}
        ],
        useWebGL: false,                        // Tell the game we want to use webgl
        showDebug: false                       // Whether to show debug messages. You can change this to true if you want
    }

    // Create a game with the options specified
    const game = new Game(options);
    
    // Start our game
    game.start(MainMenu, {});
})();

function runTests(){};