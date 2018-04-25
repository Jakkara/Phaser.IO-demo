var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'phaser-example', { create: create, preload: preload});

var page1 = [
    "Olet löytänyt pienimuotoisen demonstraation, joka on toteutettu ",
    "Tämän sivuston tarkoitus ei ole olla parhaita käytäntöjä noudattava mestariteos, jolla hankitaan työhaastattelu ja miljoonia dollareita crowdfundingia.\n",
    "Tämän ei myöskään ole tarkoitus esitellä Phaser-frameworkin useita monipuolisia ominaisuuksia, joita asiaan vihkiytyneet osaisivat varmasti arvostaa.\n",
    "\n",
    "Päinvastoin.",
    "\n",
    
];
var page2 = [
    "Tämän sivuston on tarkoitus on esitellä, miltä kahden iltapäivän perehtyminen täysin vieraaseen ympäristöön näyttää.",
    "\n",
]

//Manages font loading from Google Fonts. 1 second delay to load all fonts safely.
WebFontConfig = {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
      families: ['VT323', 'Gugi']
    }

};

var pages = [page1,page2];
var pageNumber = 0;
var currentPage = pages[pageNumber];

//load font and audio into memory
function preload(){
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.audio('bells', ['assets/04_-_Flowing_Bells.ogg'])
}

var music;
var line = [];
var wordIndex = 0;
var lineIndex = 0;
var wordDelay = 1;
var lineDelay = 1200;
var temp = false;

function create() {
    music = game.add.audio('bells');
    music.play();
}

/*
*   The main logic for all creating text.
*/

function createText(){
    displayText = game.add.text(32, 32, '', {fill: "#51B852"});
    displayText.font = 'VT323';
    displayText.wordWrap = true;
    introScreen();
    displayText.wordWrapWidth = 600;
    setTimeout(function(){
        nextLine()
    },5000);
    //game.time.events.add(5000, nextLine, this);
}

function introScreen(){ 
    displayText.fontSize = 60;
    displayText.setText('Ladataan \ndramaattista \nretrofiilistelyä...');
    setTimeout(function(){
        displayText.setText('Tervetuloa.\n')
    }, 2500);
}

//reads the next line of text
function nextLine(){
    if (lineIndex == 0){
        displayText.fontSize = 26;
        displayText.setText('');
    }
    if (lineIndex === currentPage.length){
        //  We're finished. Clean the display and turn the page.
        backspaceTransition()
        setTimeout(function(){
            turnThePage();
        },3000);
        return;
        }
    //  Split the current line into an array
    line =  currentPage[lineIndex].split('');
    //  Reset the character index to zero (the first word in the line)
    wordIndex = 0;
    //  Call the 'nextCharacter' function once for each character in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, nextCharacter, this);
    //  Advance to the next line
    lineIndex++;

}

function nextCharacter(){
    //  Add the next character
    displayText.text = displayText.text.concat(line[wordIndex]);
    //  Increment the character index
    wordIndex++;
    //  end of the line
    if (wordIndex === line.length){
        // Insert newline
        displayText.text = displayText.text.concat("\n");
        // Proceed to next line
        game.time.events.add(lineDelay, nextLine, this);
    }

}

//create an effect for removing what's on the screen
function backspaceTransition(){
    game.time.events.repeat(1, displayText.text.length / 2, backspace, this);
}
//assistant function for backspaceTransition
function backspace(){
    displayText.setText(displayText.text.substring(0, displayText.text.length-2));
}
function turnThePage(){
    //at the last page already, don't turn the page
    if (pageNumber == pages.length-1){
        return;
    }
    lineIndex = 0;
    wordIndex = 0;
    pageNumber++;
    currentPage = pages[pageNumber];
    nextLine();
}