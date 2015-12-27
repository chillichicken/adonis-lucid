'use strict'

/**
 * adonis-lucid
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const autoLoader = require('auto-loader')

class Rollback {

  constructor (Helpers, Runner) {
    this.migrations = Helpers.migrationsPath()
    this.runner = Runner
  }

  /**
   * @description returns command description
   * @method description
   * @return {String}
   * @public
   */
  description () {
    return 'Rollback migrations executed in last batch'
  }

  /**
   * @description command signature to define expectation for
   * a given command to ace
   * @method signature
   * @return {String}
   * @public
   */
  signature () {
    return '{--force?}'
  }

  /**
   * @description rollback all migrations using
   * runner provider
   * @method handle
   * @param  {Object} options
   * @param  {Object} flags
   * @return {Object}
   * @public
   */
  * handle (options, flags) {
    if (process.env.NODE_ENV === 'production' && !flags.force) {
      throw new Error('Cannot run migrations in production')
    }
    const migrationsFiles = autoLoader.load(this.migrations)
    return yield this.runner.down(migrationsFiles)
  }

}

module.exports = Rollback