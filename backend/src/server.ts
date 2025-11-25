import { app } from './index';
import 'dotenv/config';

const PORT:number = Number(process.env.PORT) || 3333; //setando a porta

app.listen(PORT, '0.0.0.0', (): void => {
  console.log(`App ta rodando na porta ${PORT}`);
});


