function boardDirective(){
    return {
        bindToController: true,
        controller: 'boardCtrl',
        controllerAs: 'board',
        templateUrl: 'app/components/board/boardTemplate.html'
    }

}

angular
    .module('boardApp')
    .directive('boardDirective',boardDirective);
