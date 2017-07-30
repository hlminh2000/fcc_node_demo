
document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    name: 'app',
    data: {
      dragons: [],
      dragonToAdd: {
        name: null,
        age: null,
        height: null,
        canFly: false,
      },
      currentEditingDragon: null,
    },
    methods: {
      refresh: function () {
        return ApiService.getDragons()
          .then(function(_allDragons){
            app.dragons = _allDragons
          })
      },
      addDragon: function () {
        return ApiService.addDragon(app.dragonToAdd)
          .then(function(_allDragons){
            app.dragons = _allDragons
            app.dragonToAdd = {}
          })
      },
      setCurrentEditingDragon: function (_dragon) {
        app.currentEditingDragon = _dragon
      },
      deleteDragon: function (_dragon) {
        return ApiService.deleteDragon(_dragon.dragonId)
          .then(function(_allDragons){
            app.dragons = _allDragons
            app.currentEditingDragon = null;
          })
      },
      updateDragonInfo: function (_dragon) {
        return ApiService.updateDragonInfo(_dragon)
          .then(function(_allDragons){
            app.dragons = _allDragons
            app.currentEditingDragon = null;
          })
      },
    }
  })
  app.refresh();
})


var ApiService = {

  getDragons: function () {
    return fetch('/dragons', {
      method: 'get'
    })
    .then(function (data) {
      return data.json();
    })
    .then(function (resJson) {
      return new Promise(function(resolve, reject) {
        resolve(resJson.dragons)
      });
    })
  },

  addDragon: function (dragon) {
    return fetch('/dragons', {
      method: 'post',
      body: JSON.stringify({
        dragon: dragon
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    .then(function(res){
      return res.json();
    })
    .then(function(resJson){
      return new Promise(function(resolve, reject) {
        resolve(resJson.dragons)
      });
    })
  },

  deleteDragon: function (dragonId) {
    return fetch('/dragons/delete', {
      method: 'post',
      body: JSON.stringify({
        dragonId: dragonId
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    .then(function (res) {
      return res.json();
    })
    .then(function(resJson){
      console.log(resJson);
      return new Promise(function(resolve, reject) {
        resolve(resJson.dragons)
      });
    })
  },

  updateDragonInfo: function (dragon) {
    return fetch('/dragons/update', {
      method: 'post',
      body: JSON.stringify({
        dragonData: dragon
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    .then(function (res) {
      return res.json();
    })
    .then(function(resJson){
      console.log(resJson.dragons.map(dragon => dragon.height));
      return new Promise(function(resolve, reject) {
        resolve(resJson.dragons)
      });
    })
  }

}
