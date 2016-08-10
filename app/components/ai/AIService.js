var AIService = function(){
  var AI = {};

//Define a custom object 'chain'
  function chain(x,y){
    this.x1 = x;
    this.y1 = y;
    this.length = 1;
    this.bounds = 0;
    this.dir = undefined;
  }
//End of class 'chain'

  AI.pChains = [];
  AI.aChains = [];

  var getPlayerVal = function(chains){
    var playerVal = 0;
    for(var i = 0; i < chains.length; i ++){
      var chain = chains[i];
      playerVal = playerVal + (chain.length * (2-chain.bounds));
    }
  }

  AI.getBoardValue = function(){
    var playerVal = getPlayerVal(this.pChains);
    var aiVal = getPlayerVal(this.aChains);
    return (aiVal - playerVal);
  }

  AI.pushChains = function(x,y){


  }

  AI.getMove = function(){
    var rand = Math.floor(Math.random() * 8);
    return rand;
  }

  return AI;
}

angular
  .module('boardApp')
  .factory('AIService',AIService);
