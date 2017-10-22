import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import * as http from 'http';
import * as stream from './stream';
import env from './env';
import { Configuration } from '../src/app/models/configuration';

const app = express();
const server = http.createServer(app);
stream.attach(server);
let configuration = new Configuration(env.HASHTAG);

app.use(compression());
app.use(bodyParser.json());
app.use(`/`, express.static(__dirname + '/../dist'));
app.get(`/api/configuration`, (req, res) => res.json(configuration));
app.put(`/api/configuration`, (req, res) => {
  configuration = req.body;
  res.sendStatus(200);
});
app.get(`/*`, (req, res) => res.sendFile(join(__dirname + '/../dist/index.html')));

server.listen(env.PORT, () => {
  console.log(`It's running on ${env.PORT}`)
});
