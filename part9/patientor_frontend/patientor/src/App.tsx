import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Container, Divider, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { setDiagnosisList, setPatientList, useStateValue } from './state';
import { Diagnosis, Patient } from './types';
import PatientListPage from './PatientListPage';
import SinglePatientPage from './SinglePatientPage';

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  useEffect(() => {
    const fetchDianosisList = async () => {
      try {
        const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisList(diagnosisFromApi));
      } catch (err) {
        console.log(err);
      }
    };

    void fetchDianosisList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<SinglePatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
