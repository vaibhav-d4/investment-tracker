// REACT IMPORTS
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// MUI IMPORTS
import { Box, Tabs, Tab } from '@mui/material';

// COMPONENT IMPORTS
import { DrawerHeader } from '../../Common/Utils/MUI Utils/LayoutUtils';
import TabPanelComponent from '../../Common/Utils/Component Utils/TabPanelComponent';
import StockDataGrid from './Stocks DataGrid/StockDataGrid';

const StocksComponent = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/stocks') navigate('/stocks/overview');
    if (path === '/stocks/overview') setActiveTab(0);
    else if (path === '/stocks/transactions') setActiveTab(1);
  }, [navigate]);

  const handleTabOnChange = (event, newTabValue) => {
    setActiveTab(newTabValue);
    if (newTabValue === 0) navigate('/stocks/overview');
    else if (newTabValue === 1) navigate('/stocks/transactions');
  };
  return (
    <>
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: -3, ml: -3 }}>
        <DrawerHeader />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabOnChange}>
            <Tab label='Overview' />
            <Tab label='Transactions' />
          </Tabs>
        </Box>
        <TabPanelComponent value={activeTab} index={0}>
          Overview
        </TabPanelComponent>
        <TabPanelComponent value={activeTab} index={1}>
          <StockDataGrid />
        </TabPanelComponent>
      </Box>
    </>
  );
};

export default StocksComponent;
