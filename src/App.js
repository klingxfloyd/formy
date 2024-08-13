import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { 
  CssBaseline, Container, Typography, TextField, Button, Paper, 
  Snackbar, CircularProgress, Box, AppBar, Toolbar
} from '@mui/material';
import { Alert } from '@mui/material';
import axios from 'axios';

// Create a dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    button: {
      main: '#2F2B4A',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#2F2B4A',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

function App() {
  const [description, setDescription] = useState('');
  const [formSchema, setFormSchema] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const response = await axiosInstance.get('/test');
      setSuccess('Connected to server successfully');
    } catch (error) {
      setError(`Error connecting to server: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axiosInstance.post('/generate-form', { description });
      setFormSchema(JSON.parse(response.data.form_structure));
      setSuccess('Form generated successfully');
    } catch (error) {
      console.error('Error generating form:', error);
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="41" viewBox="0 0 30 41" fill="none">
      <g clip-path="url(#clip0_1565_926)">
        <path d="M29.2602 23.0933C30.7059 15.2895 25.4926 7.80222 17.616 6.36996C9.73941 4.93769 2.18229 10.1028 0.736668 17.9066C-0.708953 25.7104 4.50436 33.1977 12.3809 34.63C20.2575 36.0622 27.8146 30.8971 29.2602 23.0933Z" fill="#F6EAEF" fill-opacity="0.5"></path>
        <path d="M27.1661 18.4404C26.8816 18.9561 26.5454 19.4462 26.1833 19.9107C25.2166 21.0478 23.9687 22.2681 22.3975 22.3963C20.6581 22.2233 23.3447 17.5147 23.6325 16.5378C24.777 14.1674 26.6974 9.10971 22.6755 8.49151C19.2809 8.54917 16.5619 11.5121 14.2471 13.6774C14.218 11.9124 14.6544 4.73424 11.2727 7.02448C10.7554 7.58823 10.6067 8.3794 10.2834 9.05206C9.42667 10.9964 8.30482 12.8221 6.98899 14.4942C5.59234 16.1982 4.0308 17.7838 2.28175 19.1355C1.7483 19.616 0.901256 19.8178 0.623218 20.5257C0.406607 21.1342 0.736373 21.8261 1.35388 22.0407C2.37227 22.3322 3.18699 21.32 3.97907 20.8332C7.20884 18.245 9.96335 15.0355 11.8385 11.3519C11.9032 13.0592 11.832 14.7664 11.735 16.4705C7.39312 21.8133 3.26135 27.9024 2.45956 34.8724C2.29791 36.9545 2.33024 39.9046 4.55778 40.8943C4.67417 40.9264 4.78732 40.9488 4.90048 40.9648C11.1822 41.9033 13.8333 21.7589 14.079 17.3962C16.0058 15.2757 19.6333 11.0892 22.5785 10.8618C23.3835 13.0047 19.7884 18.1393 19.5104 20.7499C19.2938 22.0119 19.5039 23.5398 20.684 24.2797C24.195 26.0446 27.7255 22.3354 29.2999 19.5167C30.0047 18.1329 27.9 17.0695 27.1694 18.434L27.1661 18.4404ZM5.38866 38.6649C2.95744 33.9467 8.39858 24.6929 11.3374 20.8652C10.7878 25.026 8.87706 36.3939 5.38866 38.6649Z" fill="#D90765"></path>
        <path d="M12.1423 3.78293C12.2134 3.80215 12.2878 3.81817 12.3621 3.83098C13.6586 4.02637 15.2912 2.81239 14.7481 1.45106C14.3246 0.640667 13.581 -0.118474 12.5691 0.0160571C10.4644 0.163401 9.98912 3.27684 12.1423 3.78293Z" fill="#D90765"></path>
      </g>
      <defs>
        <clipPath id="clip0_1565_926">
          <rect width="29" height="41" fill="white" transform="translate(0.5)"></rect>
        </clipPath>
      </defs>
    </svg>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Generate Your Form
          </Typography>
          <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Describe your form</FormLabel>
              <RadioGroup
                aria-label="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
                <FormControlLabel value="School" control={<Radio />} label="School" />
                <FormControlLabel value="Office" control={<Radio />} label="Office" />
                <FormControlLabel value="Freelance" control={<Radio />} label="Freelance" />
              </RadioGroup>
            </FormControl>
            <Box sx={{ mt: 2, position: 'relative' }}>
            <Button 
                type="submit" 
                variant="contained" 
                color="button" 
                disabled={loading}
                fullWidth
                sx={{ color: '#fff' }}
              >
                Submit Option
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </form>
        </Paper>
        
        {formSchema && (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Generated Form
            </Typography>
            <JsonForms
              schema={formSchema.schema}
              uischema={formSchema.uischema}
              data={formData}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data }) => setFormData(data)}
            />
          </Paper>
        )}
      </Container>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;