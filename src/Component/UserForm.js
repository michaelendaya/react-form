import React, { useState } from "react";
import { Button, Card, Tab, Tabs, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { styled } from '@mui/system';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";



const UserForm = (props) => {

  const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
  };
  const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
  const TabsList = styled(TabsListUnstyled)`
  min-width: 300px;
  max-width: 300px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;
  const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;
  const [user, setUser] = useState(null)
  const userLogin = (data) => {
    console.log(user)
    setUser(data)

  };
  console.log(user);
  if (user) {
    return (
      <Card variant="outlined" sx={{ width: 410, padding: 2 }
      }>
        <img className="image" src="https://www.ust.edu.ph/wp-content/uploads/2019/07/ponti-royal-ust-1024x316.png" />
        <div>Hello, {user.id_number}</div>
        {
          user.first_name
          &&
          <>
            <Box>
              <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Name:</Typography> {user.first_name} {user.last_name}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Gender:</Typography> {user.gender}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>College:</Typography> {user.college}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Program-Year Level:</Typography> {user.program}  {user.level}
            </Box>
          </>
        }
        <Button variant="contained" fullWidth type="submit" sx={{ marginTop: 2 }} onClick={() => setUser(null)}>Logout</Button>
      </Card >
    )
  }
  return (
    <Card variant="outlined" sx={{ width: 410, padding: 2, display: 'flex', paddingBottom:4, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <img className="image" src="https://www.ust.edu.ph/wp-content/uploads/2019/07/ponti-royal-ust-1024x316.png" />
      <TabsUnstyled defaultValue={0} >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TabsList>
          <Tab>Sign In</Tab>
          <Tab>Sign Up</Tab>
        </TabsList>
      </Box >
      <TabPanel value={0}>
        <SignInForm signIn={userLogin} />
      </TabPanel>
      <TabPanel value={1}>
        <SignUpForm handleSubmit={userLogin} />
      </TabPanel>
    </TabsUnstyled>
    </Card >
  )
}
export default UserForm;