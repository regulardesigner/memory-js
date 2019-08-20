// in the array above add the name of your images
let puzzleImages = ["one","two","three","four","five","six","seven","height"];
// the two variables firstCard and secondCard are used for the card matching
let firstCard;
let secondCard;
/* this array is used to store the duplicated and shuffleled puzzleImages array. 
It will be used for the front-end of the puzzle game
*/
let duplicateRandomPuzzle = [];

// duplicate the puzzleImage array into another array func
function duplicate(from, to) {
  // shuffle array func see => https://javascript.info/task/shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  // we create a array and store the concatenated result.
  const array = from.concat(from);
  // we're shaking all the things up! (by calling the shuffle func).
  shuffle(array);
  // we push every row in a new array.
  for (let k = 0; k < array.length; k++) {
    to.push(array[k]);
  };
};

function generatePuzzleUi(array){
  let result = "";
  for (let i=0; i<array.length; i++){
    result += array[i];
  };
};

function init(){
  let sectionPuzzle = document.getElementById("puzzle");
  // generate and randomise a new puzzle.
  duplicate(puzzleImages, duplicateRandomPuzzle);
  // generate the randomized puzzle with the Ui
  for(let i=0; i<duplicateRandomPuzzle.length; i++){
    sectionPuzzle.innerHTML += `<div class="card" data-name="${duplicateRandomPuzzle[i]}">${duplicateRandomPuzzle[i]}</div>`;
  };
  // alert(duplicateRandomPuzzle);
    
  sectionPuzzle.onclick = function(event){
    if(event.target.className != 'card') return;
      let cardTarget = event.target;
      event.target.classList.add('clicked');
      match(cardTarget);
  };
    
  const removeClass = () => {
      //alert("removeClass");
      let findClassInDom = document.querySelector('#puzzle');
      // loop to parse
      for(let i = 0; i < findClassInDom.children.length; i++){
          
          if (findClassInDom.children[i].matches('.clicked')) {
              findClassInDom.children[i].classList.toggle('clicked');
              console.log("> try again: class .clicked removed.")
          }
      }; 
  };
    // end removeClass
  const changeClass = () => {
      //alert(">> changeClass >> You find two identical cards!");
      let findClassInDom = document.querySelector('#puzzle');
      // loop to parse
      for(let i = 0; i < findClassInDom.children.length; i++){
          
          if (findClassInDom.children[i].matches('.clicked')) {
              findClassInDom.children[i].classList.toggle('clicked');
              findClassInDom.children[i].classList.add('win');
          }
      };
      
      console.log(">>> Well done! class .clicked removed and class .win added")
  };
    // end changeClass
  const match = (target) => {
    if (firstCard === undefined){
        // we're getting the dataset name to compare the first and second click for matching
        firstCard = target.dataset.name;
        // just to see if everthing is working
        //alert(`first >>>> ${firstCard}`);
    } else if (secondCard === undefined){
        secondCard = target.dataset.name;
        //alert(`second >>>> ${secondCard}`);
        if (firstCard === secondCard){
            firstCard = undefined;
            secondCard = undefined;
            changeClass();
        } else {
            //alert("Try again!");
            firstCard = undefined;
            secondCard = undefined;
            setTimeout(() => {removeClass();}, 1000);
        };
    } else {
        return;
    };
  };
  // end match();
};

// we load the init when the dom is ready => fully loaded in the browser.
window.onload = init();