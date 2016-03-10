'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket, rx) {


    var activityStream = rx.Observable.create(function (obs) {
      socket.on('send:new activity', function (data) {
        obs.onNext(data);
      });
    });

    window.activityStream = activityStream;



    /**
     * Demo 1: Latest activities
     */
    var activities = activityStream.scan(function(acc, activity) {
      acc.unshift(activity);
      return acc;
    }, []);

    activities.subscribe(function (data) {
      $scope.activities = data;
    });




    /**
     * Demo 2: Filtered stream
     */

    function reduceToArray(acc, activity) {
      acc.unshift(activity);
      return acc;
    }
    
    var bronzeStream = activityStream
      .filter(activity => activity.category === "bronze")
      .scan(reduceToArray, [])
      .subscribe(function (data) {
        $scope.bronzeData = data;
      });

    var silverStream = activityStream
      .filter(activity => activity.category === "silver")
      .scan(reduceToArray, [])
      .subscribe(function (data) {
        $scope.silverData = data;
      });

    var goldStream = activityStream
      .filter(activity => activity.category === "gold")
      .scan(reduceToArray, [])
      .subscribe(function (data) {
        $scope.goldData = data;
      });




    // *
    //  * Demo 3: Unseen and Category counts
     

    var unseenCount = activityStream.scan((unseen, activity) => {
      if (!activity.viewed) {
        unseen++;
      }
      return unseen;
    }, 0);
    unseenCount.subscribe(unseen => $scope.unseen = unseen);


    var groupStream = activityStream.scan((categories, activity) => {
      categories[activity.category]++;
      return categories;
    }, {bronze: 0, silver: 0, gold: 0});

    groupStream.subscribe(data => {
      $scope.categories = data;
    });


    



    /**
     * Demo 4: Graph data
     */
    var chartStream = groupStream
      .map(data => {
        var stats = [];

        for (var category in data) {
          stats.push({
            category: category,
            count: data[category]
          });
        }

        return stats;
      })

    // data
    $scope.bchart = new Morris.Bar({
      element: 'bar-example',
      data: [],
      xkey: 'category',
      ykeys: ['count'],
      labels: ['Count']
    });

    chartStream.subscribe(data => $scope.bchart.setData(data));


  });
