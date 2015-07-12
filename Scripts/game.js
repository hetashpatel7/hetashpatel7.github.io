/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="utility/utility.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/road.ts" />
/// <reference path="objects/hero.ts" />
/// <reference path="objects/coin.ts" />
/// <reference path="objects/car.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="managers/collision.ts" />
// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage;
var stats;
var assets;
var manifest = [
    { id: "road", src: "assets/images/road.gif" },
    { id: "hero", src: "assets/images/hero.png" },
    { id: "coin", src: "assets/images/coin.png" },
    { id: "car", src: "assets/images/car.png" },
    { id: "yay", src: "assets/audio/yay.ogg" },
    { id: "thunder", src: "assets/audio/thunder.ogg" },
    { id: "engine", src: "assets/audio/engine.ogg" },
    { id: "start", src: "assets/images/start.png" },
    { id: "again", src: "assets/images/again.png" },
    { id: "how", src: "assets/images/how.png" }
];
// Game Variables
var road;
var hero;
var coin;
var cars = [];
var start;
var again;
var how;
var scoreboard;
var inst1;
var inst2;
// Game Managers
var collision;
// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}
// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop);
    // calling main game function
    main();
}
// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps
    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '10px';
    document.body.appendChild(stats.domElement);
}
// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring
    road.update();
    hero.update();
    coin.update();
    for (var car = 0; car < 3; car++) {
        cars[car].update();
        collision.check(cars[car]);
    }
    collision.check(coin);
    scoreboard.update();
    stage.update();
    stats.end(); // end measuring
}
//Our start game screen function
function startScreen() {
    road = new objects.road(assets.getResult("road"));
    stage.addChild(road);
    start = new createjs.Bitmap(assets.getResult("start"));
    start.x = 180;
    start.y = 200;
    stage.addChild(start);
    how = new createjs.Bitmap(assets.getResult("how"));
    how.x = 180;
    how.y = 350;
    stage.addChild(how);
    start.on("click", startButtonClicked);
    start.on("mouseover", startButtonOver);
    start.on("mouseout", startButtonOut);
    how.on("click", howButtonClicked);
    how.on("mouseover", howButtonOver);
    how.on("mouseout", howButtonOut);
}
//move to game play screen on button click
function startButtonClicked() {
    stage.removeAllChildren();
    road = new objects.road(assets.getResult("road"));
    stage.addChild(road);
    //add coin object to stage
    coin = new objects.coin(assets.getResult("coin"));
    stage.addChild(coin);
    // add hero object to stage
    hero = new objects.hero(assets.getResult("hero"));
    stage.addChild(hero);
    // add 3 car objects to stage
    for (var car = 0; car < 3; car++) {
        cars[car] = new objects.car(assets.getResult("car"));
        stage.addChild(cars[car]);
    }
    //add scoreboard
    scoreboard = new objects.ScoreBoard();
    //add collision manager
    collision = new managers.Collision();
}
function startButtonOver() { start.alpha = 0.8; }
function startButtonOut() {
    start.alpha = 1.0;
}
//display instructions when user clicks on how to play button
function howButtonClicked() {
    stage.removeAllChildren();
    road = new objects.road(assets.getResult("road"));
    stage.addChild(road);
    inst1 = new createjs.Text("Scroll Up and Down.Get Coins.", "35px consolas", "#ffffff");
    inst1.x = 70;
    inst1.y = 180;
    stage.addChild(inst1);
    inst2 = new createjs.Text("Avoid accidents to save lives", "35px consolas", "#ffffff");
    inst2.x = 70;
    inst2.y = 250;
    stage.addChild(inst2);
    start = new createjs.Bitmap(assets.getResult("start"));
    start.x = 150;
    start.y = 350;
    stage.addChild(start);
    start.on("click", startButtonClicked);
    start.on("mouseover", startButtonOver);
    start.on("mouseout", startButtonOut);
}
function howButtonOver() { how.alpha = 0.8; }
function howButtonOut() { how.alpha = 1.0; }
function againButtonOver() {
    again.alpha = 0.8;
}
function againButtonOut() {
    again.alpha = 1.0;
}
// Our end screen(game over)Game Function
function endScreen() {
    stage.removeAllChildren();
    road = new objects.road(assets.getResult("road"));
    stage.addChild(road);
    inst1 = new createjs.Text("GAME OVER", "39px consolas", "#ffffff");
    inst1.x = 150;
    inst1.y = 60;
    stage.addChild(inst1);
    inst2 = new createjs.Text("FINAL SCORE:" + scoreboard.score, "39px consolas", "#ffffff");
    inst2.x = 150;
    inst2.y = 100;
    stage.addChild(inst2);
    again = new createjs.Bitmap(assets.getResult("again"));
    again.x = 150;
    again.y = 250;
    stage.addChild(again);
    again.on("click", startButtonClicked);
    again.on("mouseover", againButtonOver);
    again.on("mouseout", againButtonOut);
}
function main() {
    //add road object to stage
    road = new objects.road(assets.getResult("road"));
    stage.addChild(road);
    //add coin object to stage
    coin = new objects.coin(assets.getResult("coin"));
    stage.addChild(coin);
    // add hero object to stage
    hero = new objects.hero(assets.getResult("hero"));
    stage.addChild(hero);
    // add 3 car objects to stage
    for (var i = 0; i < 3; i++) {
        cars[i] = new objects.car(assets.getResult("car"));
        stage.addChild(cars[i]);
    }
    //add scoreboard
    scoreboard = new objects.ScoreBoard();
    //add collision manager
    collision = new managers.Collision();
    stage.removeAllChildren();
    startScreen();
}
//# sourceMappingURL=game.js.map