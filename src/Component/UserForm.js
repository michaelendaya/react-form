import React, { useState, useEffect } from "react";
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
  const [login, setLogin] = useState(null)
  const [invalid, setInvalid] = useState(false)
  const [accounts, setAccounts] = useState([{ id_number: 'admin', password: 'admin' }])
  useEffect(() => {
    console.log(accounts);
  }, [accounts, login]);

  const userLogin = (data) => {
    console.log(data.id_number, data.password);
    const userData = accounts.find((user) => user.id_number === data.id_number);
    console.log(userData);
    if (userData) {
      if (userData.password !== data.password) {
        setInvalid(true)
      }
      else {
        console.log(userData)
        setLogin(userData)
      }
    }
    else{
      setInvalid(true)
    }
  };
  const userCreate = (data) => {
    const user = {
      id_number: data.id_number,
      password: data.password,
      name: `${data.first_name} ${data.second_name} ${data.last_name}`,
      gender: data.gender,
      college: data.college,
      program: data.program,
      level: data.level,
    }
    setAccounts(prevArray => [...prevArray, user])
    
    setLogin(
      user
    )

  }


  if (login) {
    console.log(login)
    return (
      <Card variant="outlined" sx={{ width: 410, padding: 2 }
      }>
        <img className="image" src="https://www.ust.edu.ph/wp-content/uploads/2019/07/ponti-royal-ust-1024x316.png" />
        <div>Hello, {login.name} </div>
        <Box>
          <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Id Number:</Typography> {login.id_number} 
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Gender:</Typography> {login.gender}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>College:</Typography> {login.college}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Program:</Typography> {login.program}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Year Level:</Typography> {login.level}
        </Box>


        <Button variant="contained" fullWidth type="submit" sx={{ marginTop: 2 }} onClick={() => setLogin(null)}>Logout</Button>
      </Card >
    )
  }
  return (
    <Card variant="outlined" sx={{ width: 410, padding: 2, display: 'flex', paddingBottom: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <img className="image" src="https://www.ust.edu.ph/wp-content/uploads/2019/07/ponti-royal-ust-1024x316.png" />
      <TabsUnstyled defaultValue={0} >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TabsList>
            <Tab>Sign In</Tab>
            <Tab>Sign Up</Tab>
          </TabsList>
        </Box >
        <TabPanel value={0}>
          <SignInForm signIn={userLogin} invalid={invalid} />
        </TabPanel>
        <TabPanel value={1}>
          <SignUpForm handleSubmit={userCreate} />
        </TabPanel>
      </TabsUnstyled>
    </Card >
  )
}
export default UserForm;