function boardCtrl(boardService){
    this.tableData = boardService.getTableFormattedData();
    this.playerMove = function(col){
        boardService.playerMove(col);
        this.tableData = boardService.getTableFormattedData();
    }
    this.hoveredCol = -1;
}

angular
    .module('boardApp')
    .controller('boardCtrl',boardCtrl);
