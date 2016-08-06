function boardCtrl(){
    this.colData = [[],[],[],[],[],[],[],[]];
    var getTableFormattedData = function(colData){
       var returnArr = [[],[],[],[],[],[],[],[]];
       for(var i=0; i < 8; i++){
        for(var j=0; j < 8; j ++){
            if(!colData[i][j]){
                returnArr[i].push('');
            }
            else{
                returnArr[i].push(colData[i][j]);
            }
        }     
       }
       return returnArr;
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
