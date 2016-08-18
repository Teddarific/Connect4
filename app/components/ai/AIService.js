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
  var d4 = function(x,y){
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

  var dirs = [d0,d1,d2,d3];
  var complementDirs = [d4,d5,d6,d7];
  var allDirs = dirs.concat(complementDirs);
//End of direction functions

//Define a custom object 'chain'
  function Chain(x,y,nx,ny,boundaries,dir){
    boundaries = boundaries || 0;
    this.x1 = x;
    this.y1 = y;
    this.x2 = nx;
    this.y2 = ny;
    this.dir = dir;
    this.length = 2;
    this.bounds = boundaries;
  }
//End of class 'chain'
  AI.playerMove = true;
  AI.pChains = [];
  AI.aChains = [];
  AI.colData = [[],[],[],[],[],[],[],[]];
//Handle all the board data and formatting
AI.getTableFormattedData = function(){
  var formattedColArr = [[],[],[],[],[],[],[],[]];
  for(var i=0; i < 8; i++){
   for(var j=0; j < 8; j ++){
       if(this.colData[i][j] === undefined){
           formattedColArr[i].push('E');
       }
       else{
           formattedColArr[i].push(this.colData[i][j]);
       }
   }
  }

  //Convert columns into rows to be displayed
  var formattedRowArr = [[],[],[],[],[],[],[],[]];
   for(var i = 0; i < 8; i ++){
       for(var j = 0; j < 8; j++){
           formattedRowArr[i].push(formattedColArr[j][i]);
       }
   }
   var finalArr = [[],[],[],[],[],[],[],[]];
   for(var i = 0; i < 8; i ++){
       finalArr[i] = formattedRowArr[8-i-1];
   }
   return finalArr;
}
AI.tableData = AI.getTableFormattedData();

//Board value grading algorithm stuff
  var getPlayerVal = function(chains){
    var playerVal = 0;
    for(var i = 0; i < chains.length; i ++){
      var chain = chains[i];
        if(chain.length == 4){
          return -1;
        }
      playerVal = playerVal + (chain.length * (2-chain.bounds));
    }
    return playerVal;
  }

  AI.getBoardValue = function(){
    var playerVal = getPlayerVal(this.pChains);
      if(playerVal == -1){
        return -1000;
      }
    var aiVal = getPlayerVal(this.aChains);
      if(aiVal == -1){
        return 1000;
      }
    return (aiVal - playerVal);
  }
//End of board grading stuff
AI.AIMove = function(){
  var move = Math.floor(Math.random() * 7);
  this.colData[move].push(1);
  this.tableData = this.getTableFormattedData();
  this.updateChains(move,this.colData[move].length,this.aChains,this.pChains, 1, this.colData);
  console.log(this.getBoardValue());
  return true;
}
//Event handler communication with factory
  AI.playerMove = function(x,y){
    this.colData[x].push(0);
    this.tableData = this.getTableFormattedData();
    this.updateChains(x,y,this.pChains,this.aChains, 0, this.colData);
    console.log(this.pChains);
    return this.AIMove();
  }


//Chain updating functions
  AI.updateChains = function(x,y,chains,otherChains, playerVal, boardData){
    var that = this;
    function checkDir(dir,addNewChain){ //will return either false, or a chain to possibly update boundary
      addNewChain = addNewChain || true;
      if(!dir(x,y)){
        return false;
      }
      var nx = dir(x,y)[0];
      var ny = dir(x,y)[1];
        if(boardData[nx][ny] == undefined){ //If first one is empty, nothing else to check
          return false;
        }
        else if (boardData[nx][ny] == playerVal){ //If first one is friendly, check next one
            var nnx = dir(nx,ny) ? dir(nx,ny)[0] : -1;
            var nny = dir(nx,ny) ? dir(nx,ny)[1] : -1;
            if(nnx != -1 && boardData[nnx][nny] == playerVal){ //If second one friendly, means its next to a chain
              return that.attachToChain(x,y,nx,ny,dir,chains);
            }
            else{ //Second one either empty or hostile, either way create new chain
              var boundaries = 1;
              if(nnx == -1){ //Check to see boundary value
                boundaries = 0;
              }
              var newChain = new Chain(x,y,nx,ny,boundaries,dir);
              if(addNewChain){
                chains.push(newChain);
              }
              return newChain;
            }

        }
        else{ //If first one is hostile, update the hostile piece's boundaries
          that.updateBoundaries(nx,ny,dir,otherChains);
          return 1; //Need to let know if other side has chain, boundary + 1
        }
          return false;
      }
      //Check each direction and its complementary direction
      for(var i = 0 ; i < 4; i ++){
        var chain1 = checkDir(dirs[i]);
        var chain2 = checkDir(complementDirs[i]);
        if(chain1 == 1 && chain2 && chain2 != 1){ //check to see if boundary needs to be updated
          chain2.bounds = chain2.bounds + 1;
        }
        else if(chain2 == 1 && chain1 && chain1 != 1){
          chain1.bounds = chain1.bounds + 1;
        }
        else if(chain1 && chain2){
          that.mergeChains(chain1,chain2,x,y);
        }
      }
    }


  var getComplementDir = function(dir){
    for(var i = 0 ; i < dirs.length; i ++){
      if(dirs[i] === dir){
        return complementDirs[i];
      }
      else if(complementDirs[i] === dir){
        return dirs[i];
      }
    }
    return false;
  }

  AI.findChain = function(nx,ny,dir,chains){
    var cDir = getComplementDir(dir);
    for(var i = 0; i < chains.length; i++){
      var chain = chains[i];
        if(chain.x1 == nx && chain.y1 == ny){
          var endX = nx;
          var endY = ny;
          var cEndX = nx;
          var cEndY = ny;
          for(var j = 0; j < chain.length - 1; j ++){
            if(endX != undefined && endY != undefined && dir(endX,endY) != undefined){
              endX = dir(endX)[0];
              endY = dir(endX,endY)[1];
            }
            if(cEndX != undefined && cEndY != undefined && cDir(cEndX,cEndY) != undefined){
              cEndX = cDir(cEndX)[0];
              cEndY = cDir(cEndX,cEndY)[1];
            }
          }
          if((endX == chain.x2 && endY == chain.y2) || (cEndX == chain.x2 && cEndY == chain.y2)){
            return chain;
          }
        }
        else if(chain.x2 == nx && chain.y2 == ny){
          var endX = nx;
          var endY = ny;
          var cEndX = nx;
          var cEndY = ny;
          for(var j = 0; j < chain.length - 1; j ++){
            if(endX != undefined && endY != undefined && dir(endX,endY) != undefined){
              endX = dir(endX)[0];
              endY = dir(endX,endY)[1];
            }
            if(cEndX != undefined && cEndY != undefined && dir(endX,endY) != undefined){
              cEndX = cDir(cEndX)[0];
              cEndY = cDir(cEndX,cEndY)[1];
            }
          }
          if((endX == chain.x1 && endY == chain.y1) || (cEndX == chain.x1 && cEndY == chain.y1)){
            return chain;
          }
        }
    }
  }

  AI.attachToChain = function(x,y,nx,ny,dir,chains){ //attach new move to existing chain
    var targetChain = this.findChain(nx,ny,dir,chains);
      if(!targetChain){
        return false;
      }
    if(targetChain.x1 == nx && targetChain.y1 == ny){
      targetChain.x1 = x;
      targetChain.y1 = y;
    }
    else{
      targetChain.x2 = x;
      targetChain.y2 = y;
    }
    targetChain.length = targetChain.length + 1;
    return targetChain;
  }

  AI.updateBoundaries = function(nx,ny,dir,chains){ //Update the number of boundaries of chain at nx,ny in dir
    for(var i = 0; i < 8; i ++){
      if(dirs[i] != dir && dirs[i] != getComplementDir(dir)){
        var targetChain = this.findChain(nx,ny,dir,chains);
        if(targetChain){
          targetChain.bounds = targetChain.bounds + 1;
        }
      }
    }
  }

  AI.mergeChains = function(chain1,chain2,x,y){ //Merge chain1 and chain2, both of which contain point x,y
    if(chain1.x1 == x && chain1.x1 == y){
      if(chain2.x1 == x && chain2.y1 == y){
        chain1.x2 = chain2.x2;
        chain1.y2 = chain2.y2;
      }
      else{
        chain1.x2 = chain2.x1;
        chain1.y2 = chain2.y1;
      }
    }
    else{
      if(chain2.x1 == x && chain2.y1 == y){
        chain1.x1 = chain2.x2;
        chain1.y1 = chain2.y2;
      }
      else{
        chain1.x1 = chain2.x1;
        chain1.y1 = chain2.y1;
      }
    }
    chain1.length = chain1.length + chain2.length - 1;
    chain1.bounds = chain1.bounds + chain2.bounds;
  }


  return AI;
}

angular
  .module('boardApp')
  .factory('AIService',AIService);
