// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    { title: 'Dashboard', icon: HomeOutline, path: '/' },
    { title: 'Photos', icon: AccountCogOutline, path: '/photos' },
    // { title: 'Audits', icon: AccountCogOutline, path: '/admin/audit-entities' },
    // { title: 'Authorities', icon: AccountCogOutline, path: '/admin/authorities' },
    //{ title: 'Permission Profiles', icon: AccountCogOutline, path: '/admin/permission-profiles' },
    // { title: 'Permission Users', icon: AccountCogOutline, path: '/admin/permission-users' },
    { title: 'Permissions', icon: AccountCogOutline, path: '/admin/permissions' },
    { title: 'Profiles', icon: AccountCogOutline, path: '/admin/profiles' },
    { title: 'Users', icon: AccountCogOutline, path: '/admin/users' },
    { title: 'WhiteLabels', icon: AccountCogOutline, path: '/admin/white-labels' },
    
    { sectionTitle: 'Pages' },
    
    { title: 'Login', icon: Login, path: '/pages/login', openInNewTab: true },
    { title: 'Register', icon: AccountPlusOutline, path: '/pages/register', openInNewTab: true },
    { title: 'Error', icon: AlertCircleOutline, path: '/pages/error', openInNewTab: true },
    
    { sectionTitle: 'User Interface' },
    
    { title: 'Typography', icon: FormatLetterCase, path: '/typography' },
    { title: 'Icons', path: '/icons', icon: GoogleCirclesExtended },
    { title: 'Cards', icon: CreditCardOutline, path: '/cards' },
    { title: 'Tables', icon: Table, path: '/tables' },
    { icon: CubeOutline, title: 'Form Layouts', path: '/form-layouts' }
  ]
}

export default navigation
