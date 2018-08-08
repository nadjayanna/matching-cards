/** Function that will allocate randonly the icons into the cards**/
function allocateImages (){

  //list of elementes where the icon will be allocate
  const icons = $(".cards").find("i");

  //vector with the cards icons
  const iconsList = ["fa-ambulance", "fa-bus-alt", "fa-wheelchair", "fa-frog", "fa-chess-knight", "fa-laptop-code", "fa-smile-wink", "fa-coffee", "fa-ambulance", "fa-bus-alt", "fa-wheelchair", "fa-frog", "fa-chess-knight", "fa-laptop-code", "fa-smile-wink", "fa-coffee"];

  //initiate stars
  starsInit();

  icons.each(function() {

    //randonly select a icon from the vector of icons
    const index = getRandomInt(iconsList.length);
    $(this).removeClass();
    $(this).toggleClass('icon fas');
    $(this).toggleClass(iconsList[index]);

    //remove the icon that was already allocated
    iconsList.splice(index,1);
  });
}

/** Function to select a integer between 0 (inclusive) and max (exclusive) **/
function getRandomInt(max) {

  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

/** Function to verify if is a match**/
function isMatch(clicked){

  const firstCard = clicked[0];
  const fisrtIcon = firstCard.childNodes[0];
  const secondCard = clicked[1];
  const secondIcon = secondCard.childNodes[0];

  if (fisrtIcon.className == secondIcon.className){
    $(firstCard).toggleClass('match clicked');
    $(secondCard).toggleClass('match clicked');
  }
  else{
    $(fisrtIcon).toggleClass('icon-clicked icon');
    $(firstCard).toggleClass('hide clicked');

    $(secondIcon).toggleClass('icon-clicked icon');
    $(secondCard).toggleClass('hide clicked');
  }
}

/** Function to initiate the stars **/
function starsInit (){
  moves = 0;
  const stars = $('.stars').find('i');
  stars.each(function (){
    $(this).removeClass('far');
    $(this).addClass('fas');
  });

  $('.moves').text(`${moves} Moves`);
}

/*** Function to count the star points ***/
function starsHandler(){
  
  $('.moves').text(`${moves} Moves`);

  const starsIcons = $('.stars').find('i');

  switch (moves) {
    case 3:
      $(starsIcons[2]).toggleClass('fas far');
      break;
    case 5:
      $(starsIcons[1]).toggleClass('fas far');
      break;
    case 7:
      $(starsIcons[0]).toggleClass('fas far');
      break;
  }
}

var matchTimeOut;

let moves;

/** Function to handler the cards click event**/
var clickCardsHandler = function (event){

  event.stopPropagation();
  //select the elemente where the icon will be display
  const icon = event.currentTarget.childNodes[0];
  //make the icon show
  $(icon).toggleClass('icon-clicked icon');
  //change the card aspect
  $(this).toggleClass('hide clicked');

  const clicked = $('.clicked');
  if(clicked.length == 2){

    //dont allow clicks while evaluating if there is a match
    $('.cards').off('click');

    moves++;
    starsHandler();

    matchTimeOut = setTimeout(function() { 
      isMatch(clicked);
      //enable cards click
      $('.cards').on('click', 'li', clickCardsHandler);
    }, 1000);
  }
}

allocateImages();

/** add click listener to the cards **/
$('.cards').on('click', 'li', clickCardsHandler);

/** add click listener to the reload **/
$('#reload').on('click', function (event){

  //clear timeout for matching cards
  clearTimeout(matchTimeOut);
  //enable clicks at the cards
  $('.cards').on('click', 'li', clickCardsHandler);
  
  //adjust all cards classes so they comeback to hidden
  const cards = $(".cards").find("li");
  $(cards).removeClass();
  $(cards).toggleClass('card col hide');

  //sort the images
  allocateImages();
});