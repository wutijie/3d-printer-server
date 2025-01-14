'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const jwt = app.middleware.jwt({ app })
  // console.log('app', app)
  // console.log('app.mqtt', app.mqtt)
  // console.log('app.emqtt', app.emqtt)
  router.get('/', controller.home.index)
  // router.get('/', app.mqtt.controller.home.index)

  // 创建、订阅主题
  // app.emqtt.route('egg-test-one', app.mqtt.controller.home.index)
  // app.emqtt.route('egg-test-two', app.mqtt.controller.home.index)

  // 验证码
  router.get('/captcha', controller.util.captcha)
  // 文件上传
  router.post('/uploadfile', jwt, controller.util.uploadfile)
  // 合并文件
  router.post('/mergefile', jwt, controller.util.mergefile)
  // 检查文件
  router.post('/checkfile', jwt, controller.util.checkfile)

  router.group({ name: 'user', prefix: '/user' }, router => {
    const { login, loginNormal, register, registerNormal, info } = controller.user
    router.post('/login', login)
    router.post('/loginNormal', loginNormal)
    router.post('/register', register)
    router.post('/registerNormal', registerNormal)
    router.get('/info', jwt, info)
    router.get('/detail', jwt, info)
  })

  router.group({ name: 'user', prefix: '/programming' }, router => {
    const { insertType, insertLang, getTypeLang, getLangById } = controller.programming
    router.post('/insertType', insertType)
    router.post('/insertLang', insertLang)
    router.post('/getTypeLang', getTypeLang)
    router.get('/getLangById', getLangById)
  })

  // router.group({ name: 'mqtt', prefix: '/mqtt' }, router => {
  //   const { sendTest } = controller.mqtt
  //   router.get('/sendTest', sendTest)
  // })
}
