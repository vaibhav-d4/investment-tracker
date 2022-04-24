// MUI ICON IMPORTS
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LockClockIcon from '@mui/icons-material/LockClock';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const sideBarItemsList = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    linkText: '/home',
  },
  {
    text: 'Banks and Accounts',
    icon: <AccountBalanceIcon />,
    linkText: '/banks/accounts',
  },
  {
    text: 'Stocks',
    icon: <ShowChartIcon />,
    linkText: '/stocks/overview',
  },
  {
    text: 'Mutual Funds',
    icon: <BarChartIcon />,
    linkText: '/mutualfunds',
  },
  {
    text: 'Fixed Deposits',
    icon: <LockClockIcon />,
    linkText: '/fd',
  },
  {
    text: 'Gold',
    icon: <ViewModuleIcon />,
    linkText: '/gold',
  },
];

export default sideBarItemsList;
