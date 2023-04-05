// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Card from '@mui/material/Card'
import FormControlLabel from '@mui/material/FormControlLabel'
import { AUTH_TOKEN_KEY, BASE_API_VERSION_PATH } from 'src/util/constants'
import { loginFunction } from 'src/util/entity-utils'

interface State {
  password: string
  showPassword: boolean
}



const LoginPage = () => {
  // ** State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ** Hook
  const router = useRouter()


  const handleSubmit = async () => {
    const result = await fetch(BASE_API_VERSION_PATH + 'api/authenticate', {
      method: 'post',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (result.status !== 200 && result.status !== 201) {
      // toast.error('Erro ao autenticar. Verifique usuario e senha');
    } else {
      const bearerToken = await result.json();

      if (bearerToken && bearerToken['id_token']) {
        const jwt = bearerToken['id_token'];
        const user = bearerToken['user'];
        loginFunction(jwt, user);
      }
    }
  };



  
  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              sssssss
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to sssss! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='email' label='Email' 
                value={username} sx={{ marginBottom: 4 }} 
                onChange={(v)=>setUsername(v.target.value)}/>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={password}
                id='auth-login-password'
                onChange={(v)=>setPassword(v.target.value)}
                type={'password'}
              />
            </FormControl>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
LoginPage.getLayout = (page: ReactNode) => <>{page}</>

export default LoginPage
