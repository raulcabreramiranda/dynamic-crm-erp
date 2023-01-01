import Grid from '@mui/material/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from '@mui/material/CardContent';

import InputText from 'src/layouts/components/inputs/InputText';
import InputSelectMany from 'src/layouts/components/inputs/InputSelectMany';
import InputSuperSelect from 'src/layouts/components/modal-super-select/InputSuperSelect';
import { EntityContext } from './admin-user';

const FormUpdate = ({ isNew }: any) => {
    return (
        <>
            <CardContent>
                <form>
                    <Grid container spacing={7}>
                        <Grid item xs={12}>
                            <div>
                                <Grid>
                                    <InputText
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
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <Grid>
                                    <InputText
                                        id="admin-user-fullname"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="fullname"
                                        label={
                                            <>
                                                <Translate contentKey="adminUser.fullname" />
                                            </>
                                        }
                                    />
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <InputSuperSelect
                                    id="admin-user-adminProfile-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    relationshipType={'many-to-one'}
                                    optionsLink={'admin-profiles'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsSuperSelect={['id']}
                                    optionsShowFields={['id', 'name']}
                                    name="adminProfile"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.Profile" />
                                        </>
                                    }
                                />
                                <InputSelectMany
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
                                <InputSuperSelect
                                    id="admin-user-adminPermissionUsers-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    relationshipType={'one-to-many'}
                                    optionsLink={'admin-permission-users'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsSuperSelect={['id', 'adminPermission.id', 'adminPermission.name']}
                                    optionsShowFields={['id', 'adminPermission.id', 'adminPermission.name']}
                                    name="adminPermissionUsers"
                                    label={
                                        <>
                                            <Translate contentKey="adminUser.PermissionUsers" />
                                        </>
                                    }
                                />
                                <InputSelectMany
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
                                <InputSelectMany
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

export default FormUpdate;
