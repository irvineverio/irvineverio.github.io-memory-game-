const cards = document.querySelectorAll(".logoCard");
var isFlipped = false;
var firstCard, secondCard;
var lock = false;

cards.forEach(card => card.addEventListener("click", flip));

function flip(){
	if (lock) return;
	if (this === firstCard) return;
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
	[isFlipped, lock] = [false, false];
	[firstCard, secondCard] = [null, null];
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
	}, 1500);
}

function check(){
	var isMatch = firstCard.dataset.image === secondCard.dataset.image;
	isMatch ? success() : fail();
}

(function shuffle(){
	cards.forEach(card => {
		var position = Math.floor(Math.random() * 16);
		card.style.order = position;
	});
})();