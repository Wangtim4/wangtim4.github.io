import emitter from "./emitter";

// if (response.data.success) {
//     this.getProducts();
//     this.emitter.emit('push-message', {
//       style: 'success',
//       title: '更新成功',
//     });
//   } else {
//     this.emitter.emit('push-message', {
//       style: 'danger',
//       title: '更新失敗',
//       content: response.data.message.join('、'),
//     });
//   }
export default function (response, title = '更新') {
    if (response.data.success) {
        emitter.emit('push-message', {
            style: 'success',
            title: `${title}成功`,
        });
    } else {
        // 統一字串和陣列格式
        const message = typeof response.data.message === 'string' ? [response.data.message] : response.data.message;
        emitter.emit('push-message', {
            style: 'danger',
            title: `${title}失敗`,
            content: message.join('、'),
        });
    }
}