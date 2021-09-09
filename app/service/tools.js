'use strict'

const { Service } = require('egg')
const fse = require('fs-extra')
const path = require('path')

class ToolService extends Service {
  async mergeFile(filePath, fileHash, size) {
    // 切片的文件夹
    const chunkDir = path.resolve(this.config.UPLOAD_DIR, fileHash)
    let chunks = await fse.readdir(chunkDir)
    chunks.sort((a, b) => a.split('-')[1] - b.split('-')[1])
    chunks = chunks.map(item => path.resolve(chunkDir, item))
    await this.mergeChunks(chunks, filePath, size)
  }
  async mergeChunks(files, dest, size) {
    const pipStream = (filePath, writeStream) => new Promise(resolve => {
      const readStream = fse.createReadStream(filePath)
      readStream.on('end', () => {
        fse.unlinkSync(filePath)
        resolve()
      })
      readStream.pipe(writeStream)
    })

    await Promise.all(
      files.map((file, index) => {
        return pipStream(file, fse.createWriteStream(dest, {
          start: index * size,
          end: (index + 1) * size,
        }))
      })
    )
  }
  // 保存上传记录
  async saveUploadLogs(fileName, size) {
    const { USER_ID } = this.ctx.state
    const { mysql } = this.app
    const result = await mysql.insert('UPLOAD_LOGS', {
      USER_ID,
      FILE_NAME: fileName,
      UPLOAD_TIME: new Date(),
      FILE_SIZE: size,
    })
    const insertSuccess = result.affectedRows === 1
    return insertSuccess
  }
}

module.exports = ToolService
