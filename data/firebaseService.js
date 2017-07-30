const fs = require('fs');
const admin = require("firebase-admin");
const serviceAccount = require("./fbAccountService.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dragons-7e168.firebaseio.com/"
});

const db = admin.database();

const DRAGONS_DOCUMENT = '/dragons'
const USER_DOCUMENT = '/users'

const getContent = (_doc_path) => {
  return new Promise(function(resolve, reject) {
    return db.ref(_doc_path).once('value', (snapshot) => {
      const value = snapshot.val()
      resolve(value)
    })
  });
}

const writeDocumentContent = (_doc_path, _content) => {
  return db.ref(_doc_path)
    .set(_content)
    .then(() => {
      return getContent(_doc_path);
    })
}

const spread = (target, source) => {
  Object.keys(source).forEach( key => {
    if(target[key]){
      target[key] = source[key]
    }
  })
}

module.exports = {
  getAllDragons : () => {
    return getContent(DRAGONS_DOCUMENT)
      .then(function(dragons){
        return new Promise((resolve, reject) => {
          resolve(dragons)
        });
      })
  },
  getUserByUsername: (_username) => {
    return getContent(USER_DOCUMENT)
      .then((_users) => {
        return new Promise(function(resolve, reject) {
          resolve(_users.filter( _user => _user.username === _username )[0])
        });
      })
  },
  addDragon: (dragon) => {
    dragon.dragonId = dragon.name + Date.now();
    return getContent(DRAGONS_DOCUMENT)
      .then((_all_dragons) => {
        _all_dragons.push(dragon)
        return writeDocumentContent(DRAGONS_DOCUMENT, _all_dragons)
      })
  },
  removeDragon: (dragonId) => {
    return getContent(DRAGONS_DOCUMENT)
      .then((allDragons) => {
        const newDragonList = allDragons.filter( dragon => dragon.dragonId !== dragonId)
        return writeDocumentContent(DRAGONS_DOCUMENT, newDragonList)
      })
  },
  updateDragon: (newDragonData) => {
    return getContent(DRAGONS_DOCUMENT)
      .then((allDragons) => {
        const newDragonSet = allDragons.map( dragon => (
          dragon.dragonId === newDragonData.dragonId ? newDragonData : dragon
        ))
        return writeDocumentContent(DRAGONS_DOCUMENT, newDragonSet)
      })
  }
}
