const fs = require('fs');

const DRAGONS_DOCUMENT = './fsDatabase/dragons.json'
const USER_DOCUMENT = './fsDatabase/users.json'

const getContent = (docPath) => {
  return new Promise(function(resolve, reject) {
    resolve(JSON.parse(fs.readFileSync(docPath, 'utf8')))
  });
}

const writeDocumentContent = (docPath, _content) => {
  fs.writeFileSync(docPath, JSON.stringify(_content, null, 2), 'utf8')
  return getContent(docPath);
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
  getUserByUsername: (username) => {
    return getContent(USER_DOCUMENT)
      .then((users) => {
        return new Promise(function(resolve, reject) {
          resolve(users.filter( user => user.username === username )[0])
        });
      })
  },
  addDragon: (dragon) => {
    dragon.dragonId = dragon.name + Date.now();
    return getContent(DRAGONS_DOCUMENT)
      .then((allDragons) => {
        allDragons.push(dragon)
        return writeDocumentContent(DRAGONS_DOCUMENT, allDragons)
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
