/* eslint valid-jsdoc: "off" */

'use strict'

const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1628481048544_3657'

  config.UPLOAD_DIR = path.resolve(__dirname, '..', 'app/public')

  config.downUrl = 'http://106.14.79.5:7001'

  config.multipart = {
    mode: 'file',
    fileSize: 1048576000,
    whitelist: () => true,
  }

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable: false,
      },
    },
    mysql: {
      /* client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'htc960313',
        database: '3d_printer',
      }, */
      client: {
        host: '106.14.79.5',
        port: '3306',
        user: 'root',
        password: '0624531.',
        database: 'nuxt_admin',
      },
      app: true,
      agent: false,
    },
    jwt: {
      secret: '@wuthier!123Abc!:',
    },
    emqtt: {
      client: {
        // host: 'mqtt://192.168.0.46:1883',
        host: 'mqtt://127.0.0.1:1883',
        username: 'admin',
        password: 'public',
        clientId: 'egg',
        options: {
          keepalive: 60,
          protocolId: 'MQTT',
          protocolVersion: 4,
          clean: true,
          reconnectPeriod: 1000,
          connectTimeout: 30 * 1000,
          rejectUnauthorized: false,
        },
        msgMiddleware: [ 'msg2json' ],
      },
    },
  }
}
