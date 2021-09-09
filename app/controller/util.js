'use strict'

const BaseController = require('./base')
const svgCaptcha = require('svg-captcha')
const fse = require('fs-extra')
const path = require('path')

class UtilController extends BaseController {
  async captcha() {
    const { ctx } = this
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise: 3,
    })
    ctx.session.captcha = captcha.text
    console.log('captcha', captcha.text)
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
  }
  async uploadfile() {
    // /public/hash/(hash+index)
    // 模拟报错
    /* if (Math.random() > 0.5) {
      return (this.ctx.status = 500)
    } */
    const { ctx } = this
    const file = ctx.request.files[0]
    const { hash, name } = ctx.request.body
    const chunkPath = path.resolve(this.config.UPLOAD_DIR, hash)
    // 文件最终存储的位置， 合并之后
    // const filePath = path.resolve(this.config.UPLOAD_DIR)
    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath)
    }
    await fse.move(file.filepath, `${chunkPath}/${name}`)
    this.message('切片上传成功')
    // this.success({
    //   url: `/public/${file.filename}`,
    // })
  }
  async mergefile() {
    const { ctx } = this
    const { ext, size, hash } = ctx.request.body
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`)
    await ctx.service.tools.mergeFile(filePath, hash, size)
    const fileDirPath = path.resolve(this.config.UPLOAD_DIR, hash)
    await fse.rmdir(fileDirPath, err => {
      if (err) {
        // console.log('err', err)
      }
    })
    await ctx.service.tools.saveUploadLogs(`${hash}.${ext}`, size)
    this.success({
      url: `${this.config.downUrl}/public/${hash}.${ext}`,
    })
  }
  async checkfile() {
    const { ctx } = this
    const { ext, hash } = ctx.request.body
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`)

    let uploaded = false
    let uploadedList = []
    let url = ''
    if (fse.existsSync(filePath)) {
      // 文件存在
      uploaded = true
      url = `${this.config.downUrl}/public/${hash}.${ext}`
    } else {
      uploadedList = await this.getUploadedList(path.resolve(this.config.UPLOAD_DIR, hash))
    }
    this.success({
      url,
      uploaded,
      uploadedList,
    })
  }
  async getUploadedList(dirPath) {
    // 过滤隐藏文件
    return fse.existsSync(dirPath) ? (await fse.readdir(dirPath)).filter(name => name[0] !== '.') : []
  }
}

module.exports = UtilController
