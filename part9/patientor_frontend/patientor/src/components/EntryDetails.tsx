import { Entry } from '../types';
import HealthCheckEntryBox from './HealthCheckEntryBox';
import HospitalEntryBox from './HospitalEntryBox';
import OccupationalEntryBox from './OccupationalEntryBox';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const EntryDetails = ({ entry }: { entry: Entry }) => {
  try {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntryBox entry={entry} />;

      case 'HealthCheck':
        return <HealthCheckEntryBox entry={entry} />;

      case 'OccupationalHealthcare':
        return <OccupationalEntryBox entry={entry} />;

      default:
        return assertNever(entry);
    }
  } catch (err) {
    console.log('error', err.message);
    return null;
  }
};

export default EntryDetails;
