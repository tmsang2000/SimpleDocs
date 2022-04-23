import config from '../config';
import user from './user';
import admin from './admin';
// import place from './place';
import event from './event';
import upload from './upload';
import me from './me';
import login from './login';
// import invitation from './invitation';
import search from './search';
import news from './news';
// import connect from './connect';

let _r = (route) => {
    return '/' + config.ROUTE_PREFIX + route;
}

export function configureRoutes(app) {
    app.use(_r('/login'), login);
    app.use(_r('/me'), me);
    app.use(_r('/users'), user);
    app.use(_r('/admin'), admin);
    // app.use(_r('/places'), place);
    app.use(_r('/event'), event);
    app.use(_r('/news'), news);
    app.use(_r('/upload'), upload);
    // app.use(_r('/invitations'), invitation);
    app.use(_r('/search'), search);
    // app.use(_r('/connected'), connect)
}
