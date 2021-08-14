'use strict'

// module.exports = app => {
//   return class HomeController extends app.Controller {
//     async index() {
//       /**
//        * ctx.req = {
//        *    topic: 'a',
//        *    msg: 'xxxxxxxxxxxx',
//        * }
//        */
//       // publish
//       await this.app.emqtt.publish('topic1', 'msg123456', { qos: 0 })
//     }
//   }
// }

// app/mqtt/controller/dzbp.ts
// mqtt控制器，处理mqtt请求
module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      // emqtt.publish方法 向指定topic推送消息，第一个参数为topic，第二个参数为消息内容，第三个参数为QOS
      /* await this.app.emqtt.publish(
        'tpc', '收到消息内容为:' + this.ctx.req.message.msg,
        { qos: 0 }
      ) */
      console.log('egg-test')
      console.log('this.ctx.req', this.ctx.req)
    }
  }
}
