

angular
   .module("league", ["ui.router", "firebase"])
   .config(["$stateProvider", RouterFunction])
   .controller("ChampionIndexController", ["$firebaseArray", ChampionIndexControllerFunction])
   .controller("ChampionShowController", ["$stateParams","$firebaseObject", ChampionShowControllerFunction])


function RouterFunction($stateProvider){
  $stateProvider
    .state("championIndex", {
      url: "/champions",
      templateUrl: "js/ng-views/index.html",
      controller: "ChampionIndexController",
      controllerAs: "vm"
    })
    $stateProvider
      .state("championShow", {
        url: "/champions/:id",
        templateUrl: "js/ng-views/show.html",
        controller: "ChampionShowController",
        controllerAs: "vm"
})
}

  function ChampionIndexControllerFunction($firebaseArray){
    let ref = firebase.database().ref().child("champions");
    this.champions = $firebaseArray(ref);

    this.create = function() {
    this.champions.$add(this.newChampion).then( () => this.newChampion = {})
  }
}
  function ChampionShowControllerFunction($stateParams, $firebaseObject){
    vm = this
    let ref = firebase.database().ref().child("champions/" + $stateParams.id)
    $firebaseObject(ref).$loaded().then(function(champion) {
      vm.champion = champion
    })

    vm.update = function() {
    vm.champion.$save()
  }
  vm.delete = function(champion) {
    vm.champion.$remove(champion)
  }
}
