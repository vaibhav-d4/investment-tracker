// REACT IMPORTS
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// MUI IMPORTS
import { Box, Tabs, Tab } from '@mui/material';

// COMPONENT IMPORTS
import { DrawerHeader } from '../../Common/Utils/MUI Utils/LayoutUtils';
import TabPanelComponent from '../../Common/Utils/Component Utils/TabPanelComponent';

const BanksAndAccountsComponent = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/banks') navigate('/banks/accounts');
    if (path === '/banks/accounts') setActiveTab(0);
    else if (path === '/banks/transactions') setActiveTab(1);
    else if (path === '/banks/monthlyReport') setActiveTab(2);
    else if (path === '/banks/yearlyReport') setActiveTab(3);
  }, [navigate]);

  const handleTabOnChange = (event, newTabValue) => {
    setActiveTab(newTabValue);
    if (newTabValue === 0) navigate('/banks/accounts');
    else if (newTabValue === 1) navigate('/banks/transactions');
    else if (newTabValue === 2) navigate('/banks/monthlyReport');
    else if (newTabValue === 3) navigate('/banks/yearlyReport');
  };

  return (
    <>
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: -3, ml: -3 }}>
        <DrawerHeader />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabOnChange}>
            <Tab label='Accounts' />
            <Tab label='Transactions' />
            <Tab label='Monthly Report' />
            <Tab label='Yearly Report' />
          </Tabs>
        </Box>
        <TabPanelComponent value={activeTab} index={0}>
          Accounts
        </TabPanelComponent>
        <TabPanelComponent value={activeTab} index={1}>
          Transactions
        </TabPanelComponent>
        <TabPanelComponent value={activeTab} index={2}>
          Monthly Report
        </TabPanelComponent>
        <TabPanelComponent value={activeTab} index={3}>
          Yearly Report
        </TabPanelComponent>
      </Box>
    </>
  );
};

export default BanksAndAccountsComponent;
