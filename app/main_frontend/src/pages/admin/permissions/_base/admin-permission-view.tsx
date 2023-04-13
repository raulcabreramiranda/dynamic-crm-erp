import { useContext } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Button from 'src/layouts/components/Button';

import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';

import ViewBoolean from 'src/layouts/components/inputs/ViewBoolean';
import ViewDate from 'src/layouts/components/inputs/ViewDate';
import ViewText from 'src/layouts/components/inputs/ViewText';
import ViewSelect from 'src/layouts/components/inputs/ViewSelect';
import ViewSelectMany from 'src/layouts/components/inputs/ViewSelectMany';
import ViewImage from 'src/layouts/components/inputs/ViewImage';

import { IAdminPermission } from 'src/pages/admin/permissions/_base/admin-permission-model';

import { EntityContext } from './admin-permission';

const ViewForm = () => {
    const { viewTabActive, setViewTabActive } = useContext(EntityContext);

    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="admin-permission-name"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="name"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'name' }} contentKey="adminPermission.name" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  nameFormValue: evt.target.value })} 
            value={state.nameFormValue ? state.nameFormValue : ""}
            id="admin-permission-name" 
            entityContext={EntityContext}
            type="text" 
            name="name" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewSelect
                                    id="admin-permission-session"
                                    options={[{ value: 'PATIENT', label: translate('adminPermission.AdminPermissionSession.PATIENT') }]}
                                    entityContext={EntityContext}
                                    name="session"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Sessão' }} contentKey="adminPermission.session" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewSelect
                                    id="admin-permission-method"
                                    options={[
                                        { value: 'SEE', label: translate('adminPermission.AdminPermissionMethod.SEE') },
                                        { value: 'EDIT', label: translate('adminPermission.AdminPermissionMethod.EDIT') },
                                        { value: 'REMOVE', label: translate('adminPermission.AdminPermissionMethod.REMOVE') },
                                        { value: 'CREATE', label: translate('adminPermission.AdminPermissionMethod.CREATE') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="method"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Método' }} contentKey="adminPermission.method" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ViewForm;
