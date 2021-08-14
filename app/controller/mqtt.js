'use strict'

const BaseController = require('./base')

class MqttController extends BaseController {
  async sendTest() {
    const { emqtt } = this.app
    // console.log('this.ctx.req', this.ctx.req)
    const result = await emqtt.publish('xqq-test-one', JSON.stringify({
      content: 'test这是 egg 发布的',
    }), { qos: 0 })
    console.log('result', result)
    this.success('mqtt:ok')
  }
}

module.exports = MqttController
