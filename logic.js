var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'phaser-example', { create: create, preload: preload});

var page1 = [
    "Olet löytänyt pienimuotoisen demonstraation, joka on toteutettu Phaser-frameworkilla.","\n",
    "Tämä sivusto ei ole parhaita käytäntöjä noudattava mestariteos, jolla hankitaan työhaastattelu ja miljoonia dollareita crowdfundingia.\n",
    "Tämä ei myöskään ole esittely frameworkin moninaisista ominaisuuksista, joita asiaan vihkiytyneet osaisivat varmasti arvostaa.",
    "\n",
    "Päinvastoin."
];
var page2 = [
    "Kun alat opettelemaan uutta asiaa, on hyvä lähteä pohjatiedoista.\n",
    "Kauneinkaan talo ei pysy pystyssä jos sen perusteet on pystytetty saveen. \nVankka pohja on ehdoton vaatimus kaikelle oppimiselle.",
    "\n",
    "Mutta toisaalta, mikään ei myöskään estä puuseppää rakentamasta taloa vaikka hän ei osaisi vasaaraakaan heiluttaa.\n",
    "Tämä sivusto on esimerkki puusepästä, joka päätti rakentaa talon ilman vasaraa.",
    "\n",
];

var page3 = [
    "Tämän demonstraation kehitys lähti melko tyhjältä pohjalta.\n",
    "Ainoa käytetty ohjeistus oli Phaserin asennusohje. Kaikki muu kasattiin esimerkkien pohjalta, trial-and-error -asenteella.\n",
    "Jokainen ruudulla oleva elementti on ollut pienimuotoisen kiroilun ja reilun ihmettelyn takana.\n",
    "Lähdekoodi muistuttaakin melkoisesti korttitaloa, joka on askeleen päässä räjähtämästä käsiin.\n",
    "\n",
    "Haluankin nyt jakaa muutamia kohtaamiani ongelmia."
]

var page4 = [
    "Tekstin kirjoittaminen ja pyyhkiminen ruudulta on toteutettu toistamalla substring-funktiota millisekunttien välein.\n",
    "Tämä on kuitenkin asynkroninen metodi, joka pyörii irrallisena muun ohjelman toiminnasta.\n",
    "Sivujen välillä onkin siis asetettu manuaalisesti oikea määrä viivettä, ettei seuraavan sivun kirjoittaminen ala ennen aiemman pyyhkimistä.\n",
    "Näkemäsi viive.",".",".", " on purukumiviritelty sekoitus Phaserin toisto-ominaisuutta, tapahtumien viivyttämistä ja JavaScriptin setTimeout-funktion luovaa käyttöä."
]


//Manages font loading from Google Fonts. 1 second delay to load all fonts safely.
WebFontConfig = {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
      families: ['VT323', 'Gugi']
    }

};

var pages = [page1,page2, page3, page4];
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
var wordDelay = 20;
var lineDelay = 1400;
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
}

function introScreen(){ 
    displayText.fontSize = 60;
    displayText.setText('Ladataan...');
    setTimeout(function(){
        displayText.setText('Tervetuloa.\n')
    }, 2500);
}

//reads the next line of text
function nextLine(){
    //reset the font size at the beginning of the page
    if (lineIndex == 0){
        displayText.fontSize = 26;
        displayText.setText('');
    }
    // Have we reached the end of the page?
    if (lineIndex === currentPage.length){
        //  We're finished. Clean the display and turn the page.
        backspaceTransition()
        setTimeout(function(){
            turnThePage();
        },4000);
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
        //displayText.text = displayText.text.concat("\n");
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
        music.stop();
        return;
    }
    //clear the indexes for the next page
    lineIndex = 0;
    wordIndex = 0;
    pageNumber++;
    currentPage = pages[pageNumber];
    nextLine();
}