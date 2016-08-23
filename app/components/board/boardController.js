function boardCtrl(AIService){
    this.tableData = AIService.tableData;
    this.colData = AIService.colData;
    this.playerTurn = true;
    this.playerMove = function(col){
      if(this.playerTurn){
        this.playerTurn = false;
        this.playerTurn = AIService.playerMove(col,this.colData[col].length);
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
}

angular
    .module('boardApp')
    .controller('boardCtrl',boardCtrl);
