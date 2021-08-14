'use strict'
const jwt = require('jsonwebtoken')

// 解析token的中间件, 也可以使用egg-jwt

module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    if (!ctx.request.header.authorization) {
      ctx.body = {
        // code: -1,
        code: -666,
        message: '用户没有登录',
      }
      return
    }
    const token = ctx.request.header.authorization.replace('Bearer ', '')
    try {
      const ret = await jwt.verify(token, app.config.jwt.secret)
      ctx.state.USER_ID = ret.USER_ID
      ctx.state.USER_NAME = ret.USER_NAME
      await next()
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        ctx.body = {
          code: -666,
          message: '登录过期了',
        }
      } else {
        ctx.body = {
          code: -1,
          message: '用户信息出错',
        }
      }
    }
  }
}

