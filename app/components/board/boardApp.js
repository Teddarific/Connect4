function boardCtrl(){
    this.colData = [[],[],[],[],[],[],[],[]];
    this.getTableFormattedData = function(){
       var returnArr = [[],[],[],[],[],[],[],[]];
        for(int i=0; i < 8; i++){
            
        }
    };
    this.test = function(){
        this.colData[0].push(1);
    }
}

angular
    .module('boardApp',[])
    .controller('boardCtrl',boardCtrl);
