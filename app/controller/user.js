'use strict'

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const BaseController = require('./base')

const createRule = {
  username: {
    type: 'string',
  },
  passwd: {
    type: 'string',
  },
  captcha: {
    type: 'string',
  },
}

const HashSalt = ':wuthier!@printer'

class UserController extends BaseController {

  async login() {
    // 登录
    const { ctx, service, app } = this
    try {
      ctx.validate(createRule)

    } catch (error) {
      return this.error('参数检验失败', -1, error.errors)
    }
    const { username, passwd, captcha } = ctx.request.body
    // 验证码是否正确
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误')
    }
    // 该用户是否存在
    const res = await service.user.findHave(username)
    if (res.length === 0) {
      return this.error('该用户不存在')
    }
    const { USER_NAME, PASS_WORD, USER_ID } = res[0]
    if (username !== USER_NAME) {
      return this.error('用户名错误')
    }
    if (md5(passwd + HashSalt) !== PASS_WORD) {
      return this.error('密码错误')
    }
    // 用户信息加密成token 返回
    const token = jwt.sign({
      USER_NAME,
      USER_ID,
    }, app.config.jwt.secret, {
      expiresIn: '1h',
      // expiresIn: '1m',
    })
    this.success({
      token,
      username,
    })
  }

  async register() {
    // 注册
    const { ctx, service } = this
    try {
      // 校验传递的参数
      ctx.validate(createRule)
    } catch (error) {
      return this.error('参数检验失败', -1, error.errors)
    }
    const { username, passwd, captcha } = ctx.request.body
    // 验证码是否正确
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误')
    }
    // 该用户是否存在
    const res = await service.user.findHave(username)
    if (res.length !== 0) {
      return this.error('该用户已存在')
    }
    // 新增用户
    const req = await service.user.insertUser({
      USER_NAME: username,
      PASS_WORD: md5(passwd + HashSalt),
      CAPTCHA: captcha,
    })
    if (!req) {
      return this.error('注册失败')
    }
    this.success('注册成功')
  }

  async info() {
    const { ctx, service } = this
    const { USER_ID, USER_NAME } = ctx.state
    const msg = await service.user.findHave(USER_NAME)
    this.success(msg)
  }

  async detail() {
    const { ctx, service } = this
    const { USER_ID, USER_NAME } = ctx.state
    const msg = await service.user.findHave(USER_NAME)
    this.success(msg)
  }
}

module.exports = UserController
