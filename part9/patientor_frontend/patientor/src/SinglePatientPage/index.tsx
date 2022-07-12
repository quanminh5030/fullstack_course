import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Female, Male, Transgender } from '@mui/icons-material';

import { apiBaseUrl } from '../constants';
import { addPatientEntry, getSinglePatient, useStateValue } from '../state';
import { Entry, Patient } from '../types';
import EntryDetails from '../components/EntryDetails';
import { Button } from '@mui/material';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const SinglePatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientFetched, diagnoses }, dispatch] = useStateValue();

  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) {
      return;
    }
    const isFetched = Object.keys(patientFetched).includes(id);
    if (isFetched) {
      return setCurrentPatient(patientFetched[id]);
    }
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(getSinglePatient(patientFromApi));
        setCurrentPatient(patientFromApi);
      } catch (err) {
        console.log(err);
      }
    };
    void fetchPatient();
  }, [dispatch, modalOpen]);

  if (!currentPatient || Object.keys(diagnoses).length === 0) {
    return null;
  }

  const GenderIcon = () => {
    switch (currentPatient.gender) {
      case 'male':
        return <Male />;
      case 'female':
        return <Female />;
      case 'other':
        return <Transgender />;
      default:
        return null;
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (values.diagnosisCodes?.length === 0) {
      delete values.diagnosisCodes;
    }
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
        values
      );

      dispatch(addPatientEntry(newEntry, id as string));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>
        {currentPatient.name}
        <GenderIcon />
      </h2>
      <div>ssh: {currentPatient.ssn}</div>
      <div>occupation: {currentPatient.occupation}</div>

      <div>
        <h3>Entries</h3>
        <>
          {currentPatient.entries.map((entry: Entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </>
        <AddEntryModal
          modalOpen={modalOpen}
          onClose={closeModal}
          onSubmit={submitNewEntry}
          error={error}
        />
        <Button variant="contained" onClick={openModal}>
          Add New Entry
        </Button>
      </div>
    </div>
  );
};

export default SinglePatientPage;
