var $pug = '<img src = "./img/pug.png" class = "pug imgSize">';
var $corgi = '<img src = "./img/corgi.png" class = "corgi imgSize">';
var $playerPug = "pug";
var $playerCorgi = "corgi";
var $playerTurn = "pug";
var $box = $('.box');
var $box1 = $ ('.box_1');
var $box2 = $ ('.box_2');
var $box3 = $ ('.box_3');
var $box4 = $ ('.box_4');
var $box5 = $ ('.box_5');
var $box6 = $ ('.box_6');
var $box7 = $ ('.box_7');
var $box8 = $ ('.box_8');
var $box9 = $ ('.box_9');

var $pugText = $('.blue-pug');
var $corgiText = $('.blue-corgi');

var $headerModalText = $('.modal-head-text');
var $modalButtonConfirm = $('.remodal-confirm');
var $modalButtonCancel = $('.remodal-cancel');

$box.click(function(){

	var $this = $(this);

	if(!$this.has('img').length){
		gameTurn($playerTurn, $this);
	};

});

function changeTurnColor(r) {

	if (r == 1) {
		$pugText.css("color", "#ab956e");
		$corgiText.css("color", "#B6D6CE");
	} else {
		$corgiText.css("color", "#ab956e");
		$pugText.css("color", "#B6D6CE");
	}
};

function gameTurn(player, thisbox) {
	if(player === 'pug') {
		thisbox.append($pug);
		$playerTurn = $playerCorgi;
	} else {
		thisbox.append($corgi);
		$playerTurn = $playerPug;
	}
	console.log(player);
	youWin = checkWhoWon('.' + player);

	if(youWin) {
		gameEnd(player);
	} else {
		checkDrawGame("tie");
	}
};

// Possible combinations
// [1,2,3] [4,5,6] [7,8,9] [1,4,7] [2,5,8] [1,5,9] [3,5,7]
function checkWhoWon(player) {

	if(checkWinAlgo($box1, $box2, $box3, player)) {
		return true;
	} else if (checkWinAlgo($box4, $box5, $box6, player)) {
		return true;
	} else if (checkWinAlgo($box7, $box8, $box9, player)) {
		return true;
	} else if (checkWinAlgo($box1, $box4, $box7, player)) {
		return true;
	} else if (checkWinAlgo($box2, $box5, $box8, player)) {
		return true;
	} else if (checkWinAlgo($box1, $box5, $box9, player)) {
		return true;
	} else if (checkWinAlgo($box3, $box5, $box7, player)) {
		return true;
	} else {
		return false;
	}
}

function checkWinAlgo(slot1, slot2, slot3, player) {
	if(slot1.has(player).length &&
		slot2.has(player).length &&
		slot3.has(player).length ) {
		return true;
	} else {
		return false;
	}
}

function checkDrawGame(playerWon) {
	boxPlayed = $box.children('img').length;

	if(boxPlayed === 9) {
		console.log('tie');
		gameEnd(playerWon);
	} else {
		return false;
	}
}

function gameEnd(playerWon) {
	if(playerWon == 'corgi') {
		$headerModalText.append('CONGRATULATIONS, Corgis are cuter!');
	} else if (playerWon == 'pug') {
		$headerModalText.append('CONGRATULATIONS, Pugs are cuter!');
	} else {
		$headerModalText.append('Well now, its a tie! Both of you are cute!');
	}

    var inst = $('[data-remodal-id=modal]').remodal();
	inst.open();

	// on confirm click, reset things back to default;
	$(document).on('confirmation', '.remodal', function () {
		$box.empty();
		$playerTurn = 'pug';
		$headerModalText.text('');
	});

 	 $(document).on('closed', '.remodal', function() {
		$box.empty();
		$playerTurn = 'pug';
		$headerModalText.text('');
	});

	$(document).on('cancellation', '.remodal', function () {
		$box.empty();	
	});
}