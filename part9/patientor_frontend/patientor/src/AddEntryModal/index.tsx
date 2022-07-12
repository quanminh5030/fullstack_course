import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import { AddEntryForm, EntryFormValues } from './AddEntryForm';

interface ModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, error, onSubmit }: ModalProps) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
