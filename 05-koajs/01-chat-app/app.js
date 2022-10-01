const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const subscribers = [];

router.get('/subscribe', async (ctx, next) => {

    const msg = await new Promise(resolve => {  // подвешиваем до получения сообщения
        subscribers.push(resolve);              // складываем подписчиков==функции успешного окончания промисов
    });

    ctx.body = msg;  // после получения отдаем сообщение в ответе

});

router.post('/publish', async (ctx, next) => {

    const msg = ctx.request.body.message;   // кто-то прислал сообщение

    if (!msg) return;

    subscribers.forEach((resolve) => {  // каждой функции успешного окончания промиса передадим как результат полученное сообщение
        resolve(msg);  // здесь промис наконец выполнится и в тело ответа будет передано сообщение
    });

    //console.log(ctx.request.body);

    ctx.body = 'ok';

});

app.use(router.routes());

module.exports = app;
