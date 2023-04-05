import { useContext } from 'react';
import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';

import InputBoolean from 'src/layouts/components/inputs/InputBoolean';
import InputDate from 'src/layouts/components/inputs/InputDate';
import InputText from 'src/layouts/components/inputs/InputText';
import InputSelect from 'src/layouts/components/inputs/InputSelect';
import InputSelectMany from 'src/layouts/components/inputs/InputSelectMany';
import InputImage from 'src/layouts/components/inputs/InputImage';
import InputSuperSelect from 'src/layouts/components/modal-super-select/InputSuperSelect';
import { EntityContext } from './admin-user';

const FormUpdate = ({ isNew }: any) => {
    const { entityEdit } = useContext(EntityContext);
    if (!entityEdit || !entityEdit.id) {
        return <> </>;
    }
    return (
        <>
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
                                    labelPos="top"
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
                                    labelPos="top"
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
        </>
    );
};

export default FormUpdate;
