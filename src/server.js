import app from './app';
import initConnection from './config/database';

const port = process.env.PORT || 3000;

initConnection();

app.listen(port, () => console.log('Ready @ ', port));
