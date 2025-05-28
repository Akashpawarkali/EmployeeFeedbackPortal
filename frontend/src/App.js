// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab, AppBar, Toolbar, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmployeeForm from './components/EmployeerForm.jsx';
import AdminView from './components/AdminView.jsx';

function NavigationTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map current path to tab index
  const pathToIndex = {
    '/': 0,
    '/admin': 1,
  };

  const indexToPath = {
    0: '/',
    1: '/admin',
  };

  const [tabIndex, setTabIndex] = useState(pathToIndex[location.pathname] ?? 0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    navigate(indexToPath[newValue]);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Feedback Portal
        </Typography>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab icon={<PersonIcon />} label="Employee" />
          <Tab icon={<AdminPanelSettingsIcon />} label="Admin" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <NavigationTabs />
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App;
