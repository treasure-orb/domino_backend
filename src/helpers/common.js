const { ROOT_URL } = require('../config');
const path = require('path')
const deleteFile = require('delete')

/**
 * delete all null from object
 * @param {Object} obj 
 */
export function deleteAllNull(obj) {
  if(typeof obj != 'object') {
    return obj;
  }
  var newObj = obj
  Object.keys(newObj).forEach(key => {
    if(newObj[key] == null || newObj[key] == "") {
      delete newObj[key];
    }
  });

  return newObj
}

export function filterValidValues(body, keys) { // @param1 req.body @param2 array of keys
  var newObj = {};

  keys.forEach((key) => {
    if(body[key]) {
      newObj[key] = body[key];
    }
  });

  return newObj;
}

/**
 * @param {Object} obj 
 * @param {Array} keys 
 */
export function deleteValues(obj, keys) { // @param1 req.body @param2 array of keys
  var newObj = Object.assign({}, obj);
  keys.forEach(key => {
    if(newObj[key]) {
      delete newObj[key]
    }
  });
  return newObj;
}

/**
 * 
 * @param {Object} obj 
 * @param {Array} properties 
 */
export function hasOwnProperties(obj, properties) {
  for (const property of properties) {
    if(obj[property] == null || obj[property] == undefined) {
      return false;
    }
  }
  return true
}
/**
 * 
 * @param {Object} obj
 */

export function isEmptyObject(obj) {
  for (var item in obj) {
    return false;
  }
  return true;
}

export function getFilePath (filePath) {
  var index = filePath.indexOf("public");
  if(index > -1) {
    return filePath.substr(index, filePath.length);
  } else {
    return false
  }
}

/**
 * 
 * @param {Array} arr 
 * @param {String} key 
 * @returns {Array} 
 */
export function matchDownloadUrl (arr, key) {
  return arr.map((elt) => {
    if(elt[key]) {
      elt[key] = ROOT_URL + '/' + elt[key]
    }
    if(elt.children && elt.children.length > 0) {
      elt.children = matchDownloadUrl(elt.children, key);
    }
    return elt
  })
}

export  function matchDownloadUrlByStr  (value) {
  return `${ROOT_URL}/${value}`
}


export function deleteReqFiles(req) {
  if(req.files && req.files.length > 0) {
    
    for (const i in req.files) {
      var file = req.files[i];
      deleteFile(file.path);
    }
  }
}