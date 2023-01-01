import Grid from '@mui/material/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from '@mui/material/CardContent';

import ViewBoolean from 'src/layouts/components/inputs/ViewBoolean';
import ViewDate from 'src/layouts/components/inputs/ViewDate';
import ViewText from 'src/layouts/components/inputs/ViewText';
import ViewSelect from 'src/layouts/components/inputs/ViewSelect';
import ViewSelectMany from 'src/layouts/components/inputs/ViewSelectMany';
import ViewImage from 'src/layouts/components/inputs/ViewImage';

import { IAdminUser } from './admin-user-model';
import { EntityContext } from './admin-user';

const ViewForm = () => {
    return (
        <>
            <CardContent>
                <form>
                    <Grid container spacing={7}>
                        <Grid item xs={12}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="admin-user-login"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="login"
                                        label={
                                            <>
                                                <Translate contentKey="adminUser.login" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  loginFormValue: evt.target.value })} 
            value={state.loginFormValue ? state.loginFormValue : ""}
            id="admin-user-login" 
            entityContext={EntityContext}
            type="text" 
            name="login" 
            className={"form-control"} 
             
          /> */}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="admin-user-fullname"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="fullname"
                                        label={
                                            <>
                                                <Translate contentKey="adminUser.Image" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  fullnameFormValue: evt.target.value })} 
            value={state.fullnameFormValue ? state.fullnameFormValue : ""}
            id="admin-user-fullname" 
            entityContext={EntityContext}
            type="text" 
            name="fullname" 
            className={"form-control"} 
             
          /> */}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <ViewSelectMany
                                    id="admin-user-adminProfile-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    relationshipType={'many-to-one'}
                                    optionsLink={'admin-profiles'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsShowFields={['id', 'name']}
                                    name="adminProfile"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.Profile" />
                                        </>
                                    }
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <ViewSelectMany
                                    id="admin-user-adminPermissionUsers-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    relationshipType={'one-to-many'}
                                    optionsLink={'admin-permission-users'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsShowFields={['id', 'adminPermission.id', 'adminPermission.name']}
                                    name="adminPermissionUsers"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.PermissionUsers" />
                                        </>
                                    }
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <ViewSelectMany
                                    id="admin-user-adminWhiteLabel-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    relationshipType={'many-to-one'}
                                    optionsLink={'admin-white-labels'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsShowFields={['id']}
                                    name="adminWhiteLabel"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.WhiteLabel" />
                                        </>
                                    }
                                />
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </>
    );
};

export default ViewForm;
