// REACT IMPORTS
import React, { useState } from 'react';

// MUI IMPORTS
import { Box, Tabs, Tab } from '@mui/material';

// COMPONENT IMPORTS
import { DrawerHeader } from '../../Common/Utils/LayoutUtils';
import TabPanelComponent from '../../Common/Utils/TabPanelComponent';
<<<<<<< HEAD
import StockDataGrid from './StockDataGrid';
=======
>>>>>>> 1be46c9 (refs #STOCKS-Feature, tabs pane added)

const StocksComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabOnChange = (event, newTabValue) => {
    setActiveTab(newTabValue);
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
<<<<<<< HEAD
          <StockDataGrid />
=======
          Transactions
>>>>>>> 1be46c9 (refs #STOCKS-Feature, tabs pane added)
        </TabPanelComponent>
      </Box>
    </>
  );
};

export default StocksComponent;
