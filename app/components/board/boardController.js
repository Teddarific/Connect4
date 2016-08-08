function boardCtrl(){
    this.colData = [[1],[1],[1,1],[],[],[],[],[]];
  
    //Function to convert raw data into data to be displayed in table
    var getTableFormattedData = function(colData){
       var formattedColArr = [[],[],[],[],[],[],[],[]];
       for(var i=0; i < 8; i++){
        for(var j=0; j < 8; j ++){
            if(colData[i][j] === undefined){
                formattedColArr[i].push('E');
            }
            else{
                formattedColArr[i].push(colData[i][j]);
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
    this.tableData = getTableFormattedData(this.colData);
    this.playerMove = function(col){
        this.colData[col].push(0);
        this.tableData = getTableFormattedData(this.colData);
    }
    this.test = function(){
        this.colData[0].push(1);
        this.tableData = getTableFormattedData(this.colData);
    }
}

angular
    .module('boardApp',[])
    .controller('boardCtrl',boardCtrl);
