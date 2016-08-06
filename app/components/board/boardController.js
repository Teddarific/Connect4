function boardCtrl(){
    this.colData = [[1],[1],[2],[],[],[],[],[]];
    this.name = "Testing123";
    //Function to convert raw data into data to be displayed in table
    var getTableFormattedData = function(colData){
       var formattedColArr = [[],[],[],[],[],[],[],[]];
       for(var i=0; i < 8; i++){
        for(var j=0; j < 8; j ++){
            if(!colData[i][j]){
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
        return formattedRowArr;
    };
    this.tableData = getTableFormattedData(this.colData);

    this.test = function(){
        this.colData[0].push(1);
        this.tableData = getTableFormattedData(this.colData);
    }
}

angular
    .module('boardApp',[])
    .controller('boardCtrl',boardCtrl);
