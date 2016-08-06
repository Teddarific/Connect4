function boardCtrl(){
    this.colData = [[],[],[],[],[],[],[],[]];

    this.getTableFormattedData = function(){
       var returnArr = [[],[],[],[],[],[],[],[]];
       for(var i=0; i < 8; i++){
        for(var j=0; j < 8; j ++){
            if(!this.colData[i][j]){
                returnArr[i].push('');
            }
            else{
                returnArr[i].push(this.colData[i][j]);
            }
        }     
       }
    };

    this.test = function(){
        this.colData[0].push(1);
    }
}

angular
    .module('boardApp',[])
    .controller('boardCtrl',boardCtrl);
