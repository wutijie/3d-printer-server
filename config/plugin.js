'use strict'

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// }

exports.routerGroup = {
  enable: true,
  package: 'egg-router-group',
}

exports.validate = {
  enable: true,
  package: 'egg-validate',
}

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
}

exports.emqtt = {
  enable: false,
  package: 'egg-emqtt',
}
