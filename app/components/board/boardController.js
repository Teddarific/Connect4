function boardCtrl(AIService, $q){
    this.tableData = AIService.tableData;
    this.colData = AIService.colData;
    this.playerTurn = true;
    this.difficulty = AIService.difficulty;
    this.gameOver = AIService.gameOver;
    this.playerMove = function(col){
      if(this.playerTurn && !this.gameOver){
        var that = this;
        that.playerTurn = false;
        var AIpromise = AIService.playerMove(col,this.colData[col].length); //make this process Async, calculations get heavy
          AIpromise.then(function(){
            that.gameOver = AIService.gameOver;
            that.tableData = AIService.tableData;
            that.colData = AIService.colData;
            that.playerTurn = true;
          },function(message){
            alert("Game over");
          },function(status){
            if(status == 0){
              that.tableData = AIService.tableData;
              that.colData = AIService.colData;
            }
          });
        that.gameOver = AIService.gameOver;
        that.tableData = AIService.tableData;
        that.colData = AIService.colData;
      }
    }
    this.hoveredCol = -1;
    this.isGhostPos = function(rowIndex,colIndex){
         if((7-rowIndex) == this.colData[colIndex].length && colIndex == this.hoveredCol){
           return true;
         }
         return false;
    }

    this.newGame = function(){
      this.gameOver = false;
      this.playerTurn = AIService.resetGame();
      this.tableData = AIService.tableData;
      this.colData = AIService.colData;
    };

    this.diff = function(d){
      AIService.difficulty = d;
      this.difficulty = AIService.difficulty;

    };

    this.newGame();
}

angular
    .module('boardApp')
    .controller('boardCtrl',boardCtrl);
