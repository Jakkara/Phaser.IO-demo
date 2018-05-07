## Dokumentaatio

Ohjelman perusperiaate on piirtää ruudulle sille annettu teksti. Teksti syötetään merkkijonotauluna. Tekstiä sisältävät taulut, "page_", on koottu yhteen tauluun, "pages". Ohjelma käy tämän pages-taulun läpi foreach-tyylillä.

Käytyään yhden taulun loppuun ohjelma poistaa tekstin ruudulta ja siirtyy seuraavaan page-tauluun. Jos seuraavaa page-taulua ei ole, ohjelma suorittaa logout()-funktion ja sulkeutuu.

Tekstiä käsitellään siis ensin pages-taulussa, joka sisältää useita page-tauluja. page-taulu sisältää rivejä, jotka sisältävät merkkejä. Ohjelma käy tämän rakenteen läpi, siirtyen aina seuraavaan osioon kun aiempi on piirretty ruudulle. 

-> jaa teksti sivuihin
-> jaa sivu riveihin
-> kirjoita sivun rivit
-> kirjoita rivin merkit

Tämä toistuu kunnes teksti loppuu.

Teksti piirretään ruudulle kutsumalla ensin nextLine()-funktiota, joka käsittelee tekstiä riveittäin. nextLine() kutsuu nextChar()-funktiota, joka piirtää ruudulle tasan yhden merkin lisää. nextChar()-funktiota kutsutaan niin monta kertaa kuin rivillä on merkkejä. Rivin päätyttyä siirrytään seuraavalle riville inkrementoimalla rivilaskuria ja kutsumalla nextLine()-funktiota uudestaan. Rivien loputtua palataan nextLinestä ulos ja 'käännetään sivua' eli kutsutaan turnThePage()-metodia, joka nollaa indeksit ja vaihtaa tällä hetkellä käsiteltävän sivun seuraavaan. 

Tekstin poistaminen toteutetaan aina sivun kaiken tekstin ilmestyttyä ruudulle. Sivun lopussa kutsutaan backspaceTransition()-metodia, joka pyyhkii kaiken tekstin ruudulta. Apunaan se käyttää backspace()-metodia, joka pyyhkii ruudulta merkkejä käyttämällä substring()-funktiota. Merkkejä pyyhitään kaksi kerrallaan poistamisen nopeuttamiseksi. 

Sekä kirjoittamiseen että pyyhkimiseen käytetään Phaserin omaa game.time.events.repeat()-funktiota, joka toistaa haluttua käskyä (kirjoita/pyyhi) halutun määrän. Tämän huono puoli on sen asynkronisyys, eli se ei lukitse muun ohjelman toimintaa kirjoittaessaan tai pyyhkiessään. Tämän takia nämä operaatiot saattavat mennä tilanteissa päällekäin.

Päällekäin menemistä on vältetty käyttämällä JavaScriptin setTimeout()-funktiota, jolla voidaan käynnistää funktioita tietyn viiveen jälkeen. Sivuston pyyhkiminen on sidottu viiveeseen, joka määräytyy sivun rivimäärästä. Tämä ei ole tieteellisen tarkka menetelmä ja kirjoita/pyyhi saattavat silti mennä päällekäin, mutta totesin sen tällä hetkellä olevan kohdallaan.

Taustalla pyörivä musiikki ladataan projektin assets-kansiosta. Tiedostot ovat ogg-muodossa yhteensopivuuden puolesta. Flowing Bells on Free Music Archiven vapaan käytön musiikkia. Uloskirjautumisen musiikki on Final Fantasy XIV:n Fan Kitistä otettu teema. 

Fontti on ladattu Googlen Web Fonts -palvelusta.

Projektin kehitystyö on tehty lokaalisti ja kaikki tiedostot on asetettu synkronoitumaan automaattisesti Ubuntu-virtuaalikoneeseen, Apachen docroot-kansioon. Täten kaikki lokaalisti tehdyt muutokset siirtyvät välittömästi virtuaalikoneelle ja ovat nähtävillä Apachen portissa localhostilla. Synkronoinnin ja yleisen virtualisoinnin apuna oli Vagrant (suosittelen lämpimästi). Valmis työ siirrettiin nähtäville verkkoon kotisivuilleni.
