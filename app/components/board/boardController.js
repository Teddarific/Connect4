function boardCtrl(boardService){
    this.tableData = boardService.getTableFormattedData();
    this.colData = boardService.colData;
    this.playerMove = function(col){
        boardService.playerMove(col);
        this.tableData = boardService.getTableFormattedData();
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
