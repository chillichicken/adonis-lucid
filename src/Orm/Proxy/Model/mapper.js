'use strict'

const helpers = require('./helpers')

/**
 * @module mapper
 * @description Proxy mapper for model instance
 */
let mapper = exports = module.exports = {}

/**
 * @function get
 * @description proxying getters on model instance.
 * @param  {Object} target
 * @param  {String} name
 * @return {*}
 */
mapper.get = function (target, name) {
  if (target[name]) {
    return target[name]
  }

  if (target.attributes[name]) {
    return target.attributes[name]
  }

}

/**
 * @function set
 * @description proxying setters on model instance.
 * @param {Object} target
 * @param {String} name
 * @param {*} value
 */
mapper.set = function (target, name, value) {
  if(name === 'attributes'){
    target[name] = value
    return true
  }
  const setter = helpers.mutateField(target, name)
  target.attributes[name] = setter ? setter(value) : value
}
