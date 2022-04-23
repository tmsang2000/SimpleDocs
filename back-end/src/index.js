import { server, app } from './app';
import Database from './database';
import { configureRoutes } from './routes';
// import { configureCmsRoutes } from './cms/routes';
import config from './config';

// Config routes
configureRoutes(app);

//config cms routes
// configureCmsRoutes(app);

// Connect to db
console.log('Connecting to database ...');

var db = Database.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    server.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}!`));
    console.log('Connection has been established successfully.'); 

    // for run intergrate test only
    app.emit('ready');
});

export default app;