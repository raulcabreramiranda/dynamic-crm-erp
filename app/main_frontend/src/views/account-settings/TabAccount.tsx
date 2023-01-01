// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

import ReactSelect from 'react-select'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import InputText from 'src/layouts/components/inputs/InputText'
import InputSelect from 'src/layouts/components/inputs/InputSelect'
import InputUploadImage from 'src/layouts/components/inputs/InputImage'


const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>


          <InputUploadImage xs={12} sm={12} />
          <InputText xs={12} sm={6} name='username' label='Username' placeholder='johnDoe' defaultValue='johnDoe' />
          <InputText xs={12} sm={6} name='name' label='Name' placeholder='John Doe' defaultValue='John Doe' />
          <InputText xs={12} sm={6} type='email' label='Email' placeholder='johnDoe@example.com' defaultValue='johnDoe@example.com' />
          <InputText xs={12} sm={6} name='company' label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
          <InputSelect
            options={[
              { name: 'Van Henry', label: 'Van Henry' },
              { name: 'April Tucker', label: 'April Tucker' },
              { name: 'Ralph Hubbard', label: 'Ralph Hubbard' },
              { name: 'Omar Alexander', label: 'Omar Alexander' },
              { name: 'Carlos Abbott', label: 'Carlos Abbott' },
              { name: 'Miriam Wagner', label: 'Miriam Wagner' },
              { name: 'Bradley Wilkerson', label: 'Bradley Wilkerson' },
              { name: 'Virginia Andrews', label: 'Virginia Andrews' },
              { name: 'Kelly Snyder', label: 'Kelly Snyder' }
            ]}
            xs={12}
            sm={6}
            name='company'
            label='Company'
            placeholder='ABC Pvt. Ltd.'
            defaultValue='ABC Pvt. Ltd.'
          />

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue={['active']} multiple>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
