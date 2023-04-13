import { useContext } from 'react';
import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';

import { TabView, TabPanel } from 'primereact/tabview';
import Button from 'src/layouts/components/Button';
import InputBoolean from 'src/layouts/components/inputs/InputBoolean';
import InputDate from 'src/layouts/components/inputs/InputDate';
import InputText from 'src/layouts/components/inputs/InputText';
import InputSelect from 'src/layouts/components/inputs/InputSelect';
import InputSelectMany from 'src/layouts/components/inputs/InputSelectMany';
import InputImage from 'src/layouts/components/inputs/InputImage';
import InputSuperSelect from 'src/layouts/components/modal-super-select/InputSuperSelect';
import { EntityContext } from './admin-permission';

const FormUpdate = ({ isNew }: any) => {
    const { entityEdit, formTabActive, setFormTabActive } = useContext(EntityContext);

    if (!entityEdit || !entityEdit.id) {
        return <> </>;
    }

    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputText
                                    id="admin-permission-name"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="name"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'name' }} contentKey="adminPermission.name" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputSelect
                                    id="admin-permission-session"
                                    options={[{ value: 'PATIENT', label: translate('adminPermission.AdminPermissionSession.PATIENT') }]}
                                    entityContext={EntityContext}
                                    name="session"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Sessão' }} contentKey="adminPermission.session" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <InputSelect
                                    id="admin-permission-method"
                                    options={[
                                        { value: 'SEE', label: translate('adminPermission.AdminPermissionMethod.SEE') },
                                        { value: 'EDIT', label: translate('adminPermission.AdminPermissionMethod.EDIT') },
                                        { value: 'REMOVE', label: translate('adminPermission.AdminPermissionMethod.REMOVE') },
                                        { value: 'CREATE', label: translate('adminPermission.AdminPermissionMethod.CREATE') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="method"
                                    labelPos="top"
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

export default FormUpdate;
