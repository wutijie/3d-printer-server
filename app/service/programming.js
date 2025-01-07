'use static'

const Service = require('egg').Service

class ProgrammingService extends Service {
    // 获取所有类型
    async findAllType() {
        const { mysql } = this.app
        const result = await mysql.select('PROGRAMMING_TYPE')
        return result
    }
    // 查询类型是否存在
    async findTypeHave(typeName) {
        const { mysql } = this.app
        const result = await mysql.select('PROGRAMMING_TYPE', {
            where: {
                TYPE_NAME: typeName,
            },
        })
        return result
    }
    // 查询类型下的语言
    async findLangFromTypeId(typeId) {
        const { mysql } = this.app
        const result = await mysql.select('PROGRAMMING_LANG', {
            where: {
                TYPE_ID: typeId,
            },
        })
        return result
    }
    // 查询语言是否存在
    async findLangHave(langName) {
        const { mysql } = this.app
        const result = await mysql.select('PROGRAMMING_LANG', {
            where: {
                LANG_NAME: langName,
            },
        })
        return result
    }
    // 新增类型
    async insertType(data) {
        const { mysql } = this.app
        const result = await mysql.insert('PROGRAMMING_TYPE', {
            TYPE_NAME: data.TYPE_NAME,
            CREATE_TIME: new Date()
        })
        const insertSuccess = result.affectedRows === 1
        return insertSuccess
    }
    // 新增语言
    async insertLang(data) {
        const { mysql } = this.app
        const result = await mysql.insert('PROGRAMMING_LANG', {
            TYPE_ID: data.TYPE_ID,
            LANG_NAME: data.LANG_NAME,
            LANG_MESSAGE: data.LANG_MESSAGE,
            LANG_IMAGE: data.LANG_IMAGE,
            CREATE_TIME: new Date()
        })
        const insertSuccess = result.affectedRows === 1
        return insertSuccess
    }
}

module.exports = ProgrammingService