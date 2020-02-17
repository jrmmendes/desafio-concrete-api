import app from './app';
import initConnection from './config/database';
import settings from './config/settings';

const port = process.env.PORT || 3000;

const { connectionString } = settings.get('db');

initConnection(connectionString);

app.listen(port, () => console.log('Ready @ ', port));
