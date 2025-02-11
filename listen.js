import app from './app.js';

const { PORT = 8080 } = process.env;


app.listen(PORT, () => console.log('server is running on port 8080'));
