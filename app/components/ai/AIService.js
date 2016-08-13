var AIService = function(){
  var AI = {};
//Define direction functions
  var d0 = function(x,y){
    if(y+1 > 7){
      return undefined;
    }
    return [x,y+1];
  }
  var d1 = function(x,y){
    if(y+1 >7 || x+1 > 7){
      return undefined;
    }
    return [x+1,y+1];
  }
  var d2 = function(x,y){
    if(x+1 > 7){
      return undefined;
    }
    return [x+1,y];
  }
  var d3 = function(x,y){
    if(y-1 < 0 || x+1 > 7){
      return undefined;
    }
    return [x+1,y-1];
  }
  var d4 = funtion(x,y){
    if(y-1 < 0){
      return undefined;
    }
    return [x,y-1];
  }
  var d5 = function(x,y){
    if(y-1 < 0 || x-1 < 0){
      return undefined;
    }
    return [x-1,y-1];
  }
  var d6 = function(x,y){
    if(x-1 < 0){
      return undefined;
    }
    return [x-1,y]
  }
  var d7 = function(x,y){
    if(x-1 < 0 || y+1 > 7){
      return undefined;
    }
    return [x-1,y+1];
  }

  var dir = [d0,d1,d2,d3];
  var complementDir = [d4,d5,d6,d7];
  var allDir = dir.concat(complementDir);
//End of direction functions

//Define a custom object 'chain'
  function chain(x,y,nx,ny,boundaries,dir){
    boundaries = boundaries || 0;
    this.x1 = x;
    this.y1 = y;
    this.x2 = nx;
    this.y2 = ny;
    this.dir = dir;
    this.length = 1;
    this.bounds = boundaries;
  }
//End of class 'chain'

  AI.pChains = [];
  AI.aChains = [];
  AI.colData = [[],[],[],[],[],[],[],[]];

//Board value grading algorithm stuff
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
//End of board grading stuff

//Event handler communication with factory
  AI.playerMove = function(x,y,boardData){
    this.updateChains(x,y,this.pChains,this.aChains,boardData);
  }


//Chain updating functions
  AI.updateChains = function(x,y,chains,otherChains, playerVal, boardData){
    var that = this;
    function checkDir(dir){
      var nx = dir(x,y)[0];
      var ny = dir(x,y)[1];
        if(boardData[nx][ny] == 'E'){ //If first one is empty, nothing else to check
          return false;
        }
        else if (boardData[nx,ny] == playerVal){ //If first one is friendly, check next one
          var nnx = dir(nx,ny)[0];
          var nny = dir(nx,ny)[1];
            if(boardData[nnx][nny] == playerVal){ //If second one friendly, means its next to a chain
              return that.attachToChain(x,y,nx,ny);
            }
            else{ //Second one either empty or hostile, either way create new chain
              var boundaries = 1;
              if(boardData[nnx][nny] == 'E'){ //Check to see boundary value
                boundaries = 0;
              }
              var newChain = that.createNewChain(x,y,nx,ny,boundaries,dir);
              chains.push(newChain);
              return newChain;
            }

          }
          else{ //If first one is hostile, update the hostile piece's boundaries
            that.updateBoundaries(nx,ny,dir);
          }
      }
      function checkComplementaryDir(complementDir){
        
      }
    }

  }

  AI.attachToChain(x,y,nx,ny){ //attach new move to existing chain

  }

  AI.updateBoundaries(nx,ny,dir){

  }


  return AI;
}

angular
  .module('boardApp')
  .factory('AIService',AIService);
