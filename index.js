const cards = document.querySelectorAll(".logoCard");
var isFlipped = false;
var firstCard, secondCard;
var lock = false;

function flip(){
	if(lock) return;
	if(this === firstCard) return;
	this.classList.add("flip");
	if(!isFlipped){
		isFlipped = true;
		firstCard = this;
		return;
	}
	secondCard = this;
	check();
}

function reset(){
	isFlipped, lock = false;
	firstCard, secondCard = null;
}

function success(){
	firstCard.removeEventListener("click", flip);
	secondCard.removeEventListener("click", flip);
	reset();
}

function fail(){
	lock = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
		reset();
	}, 2000);
}

function check(){
	var isMatch = firstCard.image === secondCard.image;
	isMatch ? success() : fail();
}

function shuffle(){
	cards.forEach(card => {
		var position = Math.floor(Math.random() * 12);
		card.style.order = position;
	})
}

cards.forEach(card => card.addEventListener("click", flip));
