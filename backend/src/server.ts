import { app } from './index';
import 'dotenv/config';

const PORT = process.env.PORT || 3333; //setando a porta

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`App ta rodando na porta ${PORT}`);
});


