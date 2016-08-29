function boardCtrl(AIService){
    this.tableData = AIService.tableData;
    this.colData = AIService.colData;
    this.playerTurn = true;
    this.gameOver = AIService.gameOver;
    this.playerMove = function(col){
      if(this.playerTurn && !this.gameOver){
        this.playerTurn = false;
        this.playerTurn = AIService.playerMove(col,this.colData[col].length);
        this.gameOver = AIService.gameOver;
        this.tableData = AIService.tableData;
        this.colData = AIService.colData;
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
    };
}

angular
    .module('boardApp')
    .controller('boardCtrl',boardCtrl);
