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
import EntityContext from 'src/components/contexts/AdminProfile/admin-profile-context';

// import AdminPermissionProfileAux from 'src/components/models/AdminProfile/admin-profile---admin-permission-profile-list';

const FormUpdate = ({ isNew }: any) => {
    const { entityEdit, formTabActive, setFormTabActive } = useContext(EntityContext);

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
                                    id="admin-profile-name"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="name"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'name' }} contentKey="adminProfile.name" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <InputSelectMany
                                id="admin-profile-adminPermissionProfiles-form"
                                options={[]}
                                entityContext={EntityContext}
                                relationshipType={'one-to-many'}
                                optionsLink={'admin-permission-profiles'}
                                optionsSort={{ id: 'asc' }}
                                optionsShowFields={['id']}
                                name="adminPermissionProfiles"
                                label={
                                    <>
                                        <Translate contentKey="adminProfile.Permisos" />
                                    </>
                                }
                                formLayoutIsEmbebed={true}
                                formLayoutEmbebedView={{
                                    tableLayout: { 'adminPermission.id': { label: 'Id' }, 'adminPermission.name': { label: 'Nome' } },
                                    viewLayout: { 'adminPermission.id': { label: 'Id' }, 'adminPermission.name': { label: 'Nome' } },
                                    formLayout: { adminPermission: { label: 'Selecione os Permisos', showFields: ['name'] } },
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default FormUpdate;
