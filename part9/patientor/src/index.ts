import express from 'express';
import cors from 'cors';

import diagnosesRoute from './routes/diagnoses';
import patientRoute from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone ping here!');
  res.send('backend works');
});

app.use('/api/diagnosis', diagnosesRoute);
app.use('/api/patients', patientRoute);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
