/*
 * Create a list that holds all of your cards
 */
const cards = [...document.querySelectorAll('.card')];
const carddeck = document.querySelector('.deck');
let moveNumber =document.querySelector('.moves');
let cardsmatch = document.getElementsByClassName('match');
let modal = document.getElementById("popup1");
let closemodal = document.querySelector(".close");
let movecount = 0;
let hasturnedcard = false;
let firstclick, secondclick;
let pauseboard = false;//letting the board pause a little long until the cards and turned fully

function turncard() {
	 //shuffle(cards);
    if (pauseboard)
        return; //pause the board from turning tiles more than two tiles
    // if the card contains show it's either already selected as the first selection, or is a match - either way ignore clicks
    if (this.classList.contains('show')) {
        return;
    }
    this.classList.add('open', 'show');
    if (!hasturnedcard) {
        hasturnedcard = true;
        firstclick = this;
    } else {
        hasturnedcard = false;
        secondclick = this;
        matchingtiles();
    }
}

// the created to see whether the tiles are matching
function matchingtiles() {
    if (firstclick.dataset.name === secondclick.dataset.name) {
        //its a match
        firstclick.classList.add('match');
        secondclick.classList.add('match');
    } else {
        //not a match
        firstclick.classList.add('open', 'show','nomatch');
        secondclick.classList.add('open', 'show','nomatch');
        tilesturning();
    }
    countmoves()
}

// if the tiles are not a match after the click function a timeout is added to slow the process of tiles turning back again
function tilesturning() {
    pauseboard = true;
    setTimeout(() => {
        //delaying the turning process3
        firstclick.classList.remove('open', 'show','nomatch');
        secondclick.classList.remove('open', 'show','nomatch');
        firstclick = secondclick = null;
        pauseboard = false;
    }, 1000);

}

// function to calculate the number of moves made in the game
function countmoves(){
	movecount++;
	moveNumber.innerHTML = movecount <= 1 ? movecount+" " + "Move" : movecount +" "+ "Moves";
	if (movecount == 16){
		let stars = document.querySelectorAll('.fa.fa-star')[2];;
		stars.classList.add("checked");//adding a class to show the ratings
	}else if(movecount == 20){
		let stars = document.querySelectorAll('.fa.fa-star')[1];;
		stars.classList.add("checked");
	}
}

// onclick event handler on the cards
cards.forEach(card => card.addEventListener('click', turncard));

// reset the card of tiles after clicking on the reset button
document.querySelector('.restart').addEventListener('click', () => {
	location.reload();//this will load the whole container which will fire a another function to reset everthing using DOMCONTENTLOAD
});

//reset and shuffle the cards each time you refresh the whole page or load the page
document.addEventListener('DOMContentLoaded', () => {
    shuffle(cards);
    cards.forEach(card => {
        carddeck.appendChild(card);

                finalresult();
    });
});

//shuffle of the cards function
function shuffle(array) {
    var currentIndex = array.length,
    temporaryValue,
    randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// the modal popup function to display the results in a modal box
function finalresult(){
	if(cardsmatch.length == 16){
		modal.classList.add('show');//add show class to open the modal box
		const ratings = document.querySelector(".stars").innerHTML; //declare the variable to rating
		document.getElementById("fmove").innerHTML = movecount;//appending the # of moves
        document.getElementById("rating").innerHTML = ratings;// appending the #of stars as rating
        closeModal()//close modal box function
	}
}

//modal box close icon function
function closeModal(){
    closemodal.addEventListener("click", function(e){
        modal.classList.remove("show");
    	location.reload();
    });
}

//loop to run through the cards to fire the event
cards.forEach(card => {
	card.addEventListener('click',finalresult);
});
