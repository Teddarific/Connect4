function boardCtrl(boardService){
    this.tableData = boardService.getTableFormattedData();
    this.playerMove = function(col){
        boardService.playerMove(col);
        this.tableData = boardService.getTableFormattedData();
    }
}

angular
    .module('boardApp',[])
    .controller('boardCtrl',boardCtrl);
