var AIService = function(){
  var AI = {};

//Define a custom object 'chain'
  function chain(x,y){
    this.x1 = x;
    this.y1 = y;
    this.x2 = undefined;
    this.y2 = undefined;
    this.pts = [[x,y]];
    this.length = 1;
    this.bounds = 0;
    this.dir = undefined;
  }

  chain.prototype.checkPt = function(x,y){
    for(var i = 0; i < this.pts.length; i ++){
      if(this.pts[i][0] == x && this.pts[i][1] == y){
        return true;
      }
    }
    return false;
  }
  chain.prototype.checkDir = function(x,y){

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

  AI.pushChains = function(x,y,p){


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
