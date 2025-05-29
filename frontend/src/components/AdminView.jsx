import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseurl from '../config';
import {
  Box,
  Button,
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
} from '@mui/material';

const AdminView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, severity: 'success', message: '' });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/feedback`, {
        params: filter ? { category: filter } : {},
      });
      setFeedbacks(res.data);
    } catch (err) {
      setToast({ open: true, severity: 'error', message: 'Failed to fetch feedbacks' });
      console.error(err);
    }
    setLoading(false);
  };

  const markReviewed = async (id) => {
    setLoading(true);
    try {
      await axios.patch(`${baseurl}/feedback/${id}/reviewed`);
      setToast({ open: true, severity: 'success', message: 'Marked as reviewed' });
      fetchData();
    } catch (err) {
      setToast({ open: true, severity: 'error', message: 'Failed to mark reviewed' });
      console.error(err);
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${baseurl}/feedback/${id}`);
      setToast({ open: true, severity: 'success', message: 'Feedback deleted' });
      fetchData();
    } catch (err) {
      setToast({ open: true, severity: 'error', message: 'Failed to delete feedback' });
      console.error(err);
      setLoading(false);
    }
    setConfirmDelete({ open: false, id: null });
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseurl}/feedback`, {
          params: filter ? { category: filter } : {},
        });
        setFeedbacks(res.data);
      } catch (err) {
        setToast({ open: true, severity: 'error', message: 'Failed to fetch feedbacks' });
        console.error(err);
      }
      setLoading(false);
    };
    fetchDataAsync();
  }, [filter]);

  return (
    <Box p={4} bgcolor="#f4f6f8" minHeight="100vh">
      <Typography variant="h4" fontWeight="700" gutterBottom textAlign="center">
        Employee Feedback Dashboard
      </Typography>

      <Box
        maxWidth={360}
        mx="auto"
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="white"
        p={2}
        borderRadius={2}
        boxShadow={1}
      >
        <Typography variant="subtitle1" fontWeight="600">
          Filter by Category:
        </Typography>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          disabled={loading}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Work Environment">Work Environment</MenuItem>
          <MenuItem value="Leadership">Leadership</MenuItem>
          <MenuItem value="Growth">Growth</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress size={48} />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: '100%', mx: 'auto', boxShadow: 3 }}
        >
          <Table>
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: '700' }}>Feedback</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: '700', minWidth: 140 }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: '700', minWidth: 180 }}>
                  Submitted On
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: '700', minWidth: 110 }}>
                  Reviewed
                </TableCell>
                <TableCell
                  sx={{ color: 'white', fontWeight: '700', minWidth: 140 }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    No feedback found for selected category.
                  </TableCell>
                </TableRow>
              ) : (
                feedbacks.map((f) => (
                  <TableRow
                    key={f._id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ maxWidth: 300, whiteSpace: 'normal' }}>
                      {f.text}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={f.category}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(f.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {f.reviewed ? (
                        <Typography color="success.main" fontWeight="700">
                          ✅ Reviewed
                        </Typography>
                      ) : (
                        <Typography color="error.main" fontWeight="700">
                          ❌ Pending
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                      {!f.reviewed && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => markReviewed(f._id)}
                          disabled={loading}
                          sx={{ mr: 1 }}
                        >
                          Mark Reviewed
                        </Button>
                      )}
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => setConfirmDelete({ open: true, id: f._id })}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, id: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this feedback? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDelete({ open: false, id: null })}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => deleteFeedback(confirmDelete.id)}
            autoFocus
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications */}
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
    </Box>
  );
};

export default AdminView;
