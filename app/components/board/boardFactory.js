var boardService = function($q){
    var service = {};
    service.colData = [[],[],[],[],[],[],[],[]];

    service.playerTurn = true;

    //Function to convert raw data into data to be displayed in table
    service.getTableFormattedData = function(){
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
    };
    service.AIMove = function(){
      var rand = Math.floor(Math.random() * 8);
      this.colData[rand].push(1);
      playerTurn = true;
    };

    service.playerMove = function(col){
      if(this.playerTurn){
        this.colData[col].push(0);
        this.tableData = this.getTableFormattedData();
        this.AIMove();
      }
    }
    return service;
}

angular
    .module('boardApp')
    .factory('boardService',boardService);
