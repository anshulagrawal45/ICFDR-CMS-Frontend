import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Campaign, Category, History, Security, Settings } from '@mui/icons-material';
import AnnouncementCreation from './AnnouncementCreation/AnnouncementCreation';
import Configuration from './Configuration/Configuration';
import ManagePermissions from './ManagePermissions/ManagePermissions';
import { Context } from '../../Context';
import { Navigate, useNavigate } from 'react-router-dom';
import Activities from './Activities/Activities';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Miscellaneous() {
  let { isAdmin, userID } = React.useContext(Context)
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  let navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (!userID) {
      navigate("/client/login")
    }
  }, [navigate, userID])

  return (
    <Box sx={{ p: "0", m: "0", bgcolor: 'background.paper', height: ["fit-content", "fit-content", "100vh", "100vh"], width: "100%", display: ["block", "block", "flex", "flex"] }}>
      <AppBar position="static" sx={{ p: "0", width: ["100%", "100%", "fit-content", "fit-content"] }}>
        <Tabs
          value={value}
          orientation={'vertical'}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab title={"Make Announcements"} label={TabName(<Campaign />, "Announcement")} {...a11yProps(0)} />
          {<Tab title={"Configure Centers and Roles settings"} label={TabName(<Settings />, "Configuration")} {...a11yProps(1)} />}
          {<Tab title={"Permissions to Employees"} label={TabName(<Security />, "Permissions")} {...a11yProps(2)} />}
          {<Tab title={"All Activities"} label={TabName(<History />, "Activities")} {...a11yProps(3)} />}
          {<Tab title='Profession Categories' label={TabName(<Category />, "Categories")} {...a11yProps(4)} />}
        </Tabs>
      </AppBar>
      <Box
        width={"100%"}
        height={"100vh"}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
      // onChangeIndex={handleChangeIndex}
      >
        <TabPanel sx={{ height: "100%" }} value={value} index={0} dir={theme.direction}>
          <AnnouncementCreation />
        </TabPanel>
        {<TabPanel value={value} index={1} dir={theme.direction}>
          <Configuration />
        </TabPanel>}
        {<TabPanel value={value} index={2} dir={theme.direction}>
          <ManagePermissions />
        </TabPanel>}
        {<TabPanel value={value} index={3} dir={theme.direction}>
          <Activities />
        </TabPanel>}
        {<TabPanel value={value} index={4} dir={theme.direction}>
          <Navigate to="professionCategories"/>
        </TabPanel>}
      </Box>
    </Box>
  );
}

function TabName(icon, title) {
  return <Box display={"flex"} alignItems={"center"} gap={"5px"} width={"100%"}>
    <Box>{icon}</Box><Typography>{title}</Typography>
  </Box>
}