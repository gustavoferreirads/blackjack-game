import express from 'express';
import { GameApplication } from '../../application/GameApplication';
import { BaseError } from '../../domain/errors/BaseError';
import { InMemoryStore } from '../store/InMemoryStore';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const store = new InMemoryStore();
const gameApp = new GameApplication(store);

app.get('/balance', (req, res) => {
  res.json({ balance: gameApp.getBalance() });
});

app.post('/start', (req, res) => {
  const { bet } = req.body;
  try {
    gameApp.startGame(bet);
    res.json(gameApp.getGameState());
  } catch (error) {
    handleError(res, error);
  }
});
app.post('/hit', (req, res) => {
  try {
    gameApp.playerHit();
    res.json(gameApp.getGameState());
  } catch (error) {
    handleError(res, error);
  }
});

app.post('/double', (req, res) => {
  try {
    gameApp.playerDouble();
    res.json(gameApp.getGameState());
  } catch (error) {
    handleError(res, error);
  }
});

app.post('/stand', (req, res) => {
  try {
    gameApp.playerStand();
    res.json(gameApp.getGameState());
  } catch (error) {
    handleError(res, error);
  }
});

app.post('/reset', (req, res) => {
  try {
    gameApp.resetGame();
    res.json(gameApp.getGameState());
  } catch (error) {
    handleError(res, error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function handleError(res: express.Response, error: any) {
  console.error(error);
  console.log(error instanceof BaseError);
  if (error instanceof BaseError) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
