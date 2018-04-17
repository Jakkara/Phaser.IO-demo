var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, preload: preload });

var content = [
    "The sky above the port was the color of television, tuned to a dead channel.",
    "`It's not like I'm using,' Case heard someone say, as he shouldered his way ",
    "through the crowd around the door of the Chat. `It's like my body's developed",
    "this massive drug deficiency.' It was a Sprawl voice and a Sprawl joke.",
    "The Chatsubo was a bar for professional expatriates; you could drink there for",
    "a week and never hear two words in Japanese.",
    "",
];

//Manages font loading from Google Fonts. 1 second delay to load all fonts safely.
WebFontConfig = {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
      families: ['VT323', 'Gugi']
    }

};

function preload(){
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.audio('bells', ['assets/04_-_Flowing_Bells.ogg'])
}

var music;
var line = [];
var wordIndex = 0;
var lineIndex = 0;
var wordDelay = 90;
var lineDelay = 90;

function create() {
    music = game.add.audio('bells');
    music.play();
}

function createText(){
    displayText = game.add.text(32, 32, '', {fill: "#19de65" });
    displayText.font = 'VT323';
    game.time.events.add(2000, nextLine, this);
    loadingScreen();
}

function loadingScreen(){ 
    displayText.fontSize = 60;
    displayText.setText('Initiating...')

}

function nextLine() {
    if (lineIndex == 0){
        displayText.fontSize = 22;
        displayText.setText('');
    }
    if (lineIndex === content.length){
        //  We're finished
        //TODO more delay here
        game.add.tween(displayText).to( { alpha: 0 }, 4000, "Elastic", true);
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

function nextWord() {

    //  Add the next word onto the text string, followed by a space
    displayText.text = displayText.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        displayText.text = displayText.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, nextLine, this);
    }

}

function backspaceTransition() {

}