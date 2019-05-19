window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.sotf__spirits').onkeyup = updateTotals;
}, false);

function markWinners(element, index) {
  if (-1 == spirit_winners.indexOf(index+1)) {
    element.classList.remove('sotf__spirit-score--winner');
  } else {
    element.classList.add('sotf__spirit-score--winner');
  }
}

function updateTotals(event) {  
  var player_scores = [null,null,null,null];
  var total_scores = [null,null,null,null];
  var num_rows = 13;
  
  // calculate winner(s) for single spirit
  for (let r=1; r <= num_rows; r++) {
    let spirit_winners = [];
    let high_value = 0;
    
    // determine winner in each spirit
    for (let c=1; c<=4; c++) {
      let parent = document.querySelector('.sotf__spirit--' + r + ' .sotf__spirit-score--' + c );
      let value = document.querySelector('.sotf__spirit--' + r + ' .sotf__spirit-score--' + c + ' input').value;
      
      if ('' != value && parseInt(value) >= high_value && parseInt(value) !== 0) {
        if (parseInt(value) == high_value) {
          // tie for first place
          spirit_winners.push(c);
        } else {
          // set new first place
          spirit_winners = [c];
          high_value = value;
        }
      }
    }
    
    // add class to winners
    let spirits = document.querySelectorAll('.sotf__spirit--' + r + ' .sotf__spirit-score');
    spirits.forEach( markWinners );
  }
  
  // calculate totals
  for (let c=1; c<=4; c++) {
    for (let r=1; r<=num_rows; r++) {
      let score = document.querySelector('.sotf__spirit--' + r + ' .sotf__spirit-score--' + c);
      let value = document.querySelector('.sotf__spirit--' + r + ' .sotf__spirit-score--' + c + ' input').value;
      
      if (score.classList.contains('sotf__spirit-score--winner')) {
        player_scores[c-1] = (null === player_scores[c-1]) ? value : parseInt(player_scores[c-1]) + parseInt(value); 
      } else if (0 === parseInt(value)) {
        player_scores[c-1] = (null === player_scores[c-1]) ? -3 : parseInt(player_scores[c-1]) - 3;
      } else if ('' !== value) {
        player_scores[c-1] = (null === player_scores[c-1]) ? 0 : parseInt(player_scores[c-1]);
      }
    }
  }
  
  // display totals
  for (let c=1; c<=4; c++) {
    let current_score = player_scores[c-1];
    let score = null;
    
    if ( null !== current_score) {
      score = current_score;
    } 
    
    total_scores[c-1] = score;
    document.querySelector('.sotf__total--' + c + ' input').value = score;
  }
  
  // add class to game winner
  let totals = document.querySelectorAll('.sotf__total');
  let max_score = Math.max.apply(null, total_scores);
  console.log(max_score);
  
  totals.forEach(function(element, index) {
    if (total_scores[index] == max_score) {
      element.classList.add('sotf__total--winner');
    } else {
      element.classList.remove('sotf__total--winner');
    }
  });
}