'use strict'

const BaseController = require('./base')

class ProgrammingController extends BaseController {
  // 插入类型
  async insertType() {
    const { ctx, service } = this
    const { typeName } = ctx.request.body
    const res = await service.programming.findTypeHave(typeName)
    if(res.length !== 0) {
      return this.error('该类型已存在')
    }
    const req = await service.programming.insertType({
      TYPE_NAME: typeName,
    })
    if(!req) {
      return this.error()
    }
    this.success()
  }

  // 插入语言
  async insertLang() {
    const { ctx, service } = this
    const { typeId, langName, langMessage, langImage } = ctx.request.body
    const res = await service.programming.findLangHave(langName)
    if(res.length !== 0) {
      return this.error('该类型已存在')
    }
    const req = await service.programming.insertLang({
      TYPE_ID: typeId,
      LANG_NAME: langName,
      LANG_IMAGE: langImage,
      LANG_MESSAGE: langMessage,
    })
    if(!req) {
      return this.error()
    }
    this.success()
  }

  // 获取类型和语言
  async getTypeLang() {
    const { ctx, service } = this
    const typeRes = await service.programming.findAllType()

    let typeLists = [];
    for (const typeItem of typeRes) {
      let langLists = [];
      const langRes = await service.programming.findLangFromTypeId(typeItem.TYPE_ID)
      for (const langItem of langRes) {
        langLists.push({
          id: langItem.LANG_ID,
          name: langItem.LANG_NAME,
          imageSrc: langItem.LANG_IMAGE,
          message: langItem.LANG_MESSAGE,
        })
      }
      typeLists.push({
        id: typeItem.TYPE_ID,
        name: typeItem.TYPE_NAME,
        children: langLists,
      })
    }

    this.success(typeLists)
  }

}

module.exports = ProgrammingController
