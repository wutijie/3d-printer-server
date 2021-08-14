'use strict'

const Service = require('egg').Service

class UserService extends Service {
  // 获取所有用户
  async findAll() {
    const { mysql } = this.app
    const result = await mysql.select('USER_MESSAGE')
    return result
  }
  // 查询用户是否存在
  async findHave(username) {
    console.log('username', username)
    const { mysql } = this.app
    const result = await mysql.select('USER_MESSAGE', {
      where: {
        USER_NAME: username,
      },
    })
    return result
  }
  // 新增用户
  async insertUser(data) {
    const { mysql } = this.app
    const result = await mysql.insert('USER_MESSAGE', {
      USER_NAME: data.USER_NAME,
      PASS_WORD: data.PASS_WORD,
      CAPTCHA: data.CAPTCHA,
      CREATE_TIME: new Date(),
    })
    const insertSuccess = result.affectedRows === 1
    return insertSuccess
  }
}

module.exports = UserService
