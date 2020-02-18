import app from './app';
import initDatabase from './config/database';
import settings from './config/settings';

const port = process.env.PORT || 3000;
const { connectionString } = settings.get('db');

initDatabase(connectionString);

app.listen(port, () => console.log('Ready @ ', port));
