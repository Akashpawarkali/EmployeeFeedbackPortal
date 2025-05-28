import React, { useState } from 'react';
import axios from 'axios';
import baseurl from '../config';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';

const EmployeeForm = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, severity: 'success', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !category) {
      setToast({ open: true, severity: 'error', message: 'Please fill all fields' });
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${baseurl}/feedback`, { text, category });
      setText('');
      setCategory('');
      setToast({ open: true, severity: 'success', message: 'Thank you for your feedback!' });
    } catch (err) {
      setToast({ open: true, severity: 'error', message: 'Submission failed. Try again.' });
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#f9f9f9"
      p={2}
    >
      <Paper
        elevation={4}
        sx={{ p: 5, width: '100%', maxWidth: 480, borderRadius: 3 }}
      >
        <Typography variant="h5" fontWeight="600" gutterBottom textAlign="center">
          Submit Anonymous Feedback
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Your Feedback"
            placeholder="Write your feedback here..."
            fullWidth
            multiline
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            margin="normal"
            disabled={loading}
            required
            autoFocus
          />
          <Select
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            margin="normal"
            disabled={loading}
            required
            sx={{ mt: 2 }}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            <MenuItem value="Work Environment">Work Environment</MenuItem>
            <MenuItem value="Leadership">Leadership</MenuItem>
            <MenuItem value="Growth">Growth</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: '600' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : 'Submit Feedback'}
          </Button>
        </form>

        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={() => setToast({ ...toast, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setToast({ ...toast, open: false })}
            severity={toast.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default EmployeeForm;
