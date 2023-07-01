import * as React from 'react';
import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ResponsiveAppBar from './subpages/appbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Homepage() {
  const [fetchError, setFetchError] = useState(null)
  const [staff, setStaff] = useState(null)

  useEffect(() => {
    const fetchStaff = async () =>{
      const {data, error} = await supabase.from('staff').select()

      if(error){
        setFetchError('erorr fetching staff data')
        console.log(error)
        setStaff(null)
      }

      if(data){
        setStaff(data)
        console.log(data)
        setFetchError(null)
      }
    }

    fetchStaff()
  },[])

  return (
    <ThemeProvider theme={defaultTheme}>
      <ResponsiveAppBar/>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
            
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {fetchError && (<p>{fetchError}</p>)}
              {staff && (
              <div>
                {staff.map(staf => (
                  <p>{staf.name}</p>
                ))}
              </div>)}
            </Typography>
          </Container>
        </Box>
    </ThemeProvider>
  );
}