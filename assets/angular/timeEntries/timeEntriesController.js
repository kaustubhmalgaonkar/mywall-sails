/**
 * Created by kaustubh on 11/5/16.
 */
app.controller('TimeEntriesController',['$log','$scope','$location','data', 'TimeEntriesFactory',function($log,$scope,$location,data,TimeEntriesFactory){
  if (data) {
    if(data.timeEntriesList != undefined){
      data.timeEntriesList.success(function (data) {
        $scope.timeEntries = data;
      });
    }
    if(data.tagsList != undefined){
      data.tagsList.success(function (data) {
        $scope.tags = data;
      });
    }
  }

  io.socket.on('time-entry-created',function(obj){
    if(obj){
      $scope.$broadcast('timeEntryCreated', obj);
    }
  });

  $scope.$on('timeEntryCreated',function(event,obj){
    console.log(obj)
    $scope.timeEntries.push(obj.time_entry);
    $scope.$apply();
  });

  $scope.$on('tagCreated',function(event,obj){
    console.log(obj)
    $scope.tags.push(obj.tag);
    $scope.$apply();
  });

  angular.extend($scope, {
    newTimeEntry: {},
    timeEntries:[],
    tags:[]
  });

  angular.extend($scope, {
    saveTimeEntry: function (newTimeEntryForm) {
      TimeEntriesFactory.saveNewTimeEntry($scope.newTimeEntry).success(function (response) {
        $scope.newTimeEntry= {};
        $location.path("/time-entries");
      }).error(function (message, code, data) {
        alert(message);
      });
    }
  });
}]);