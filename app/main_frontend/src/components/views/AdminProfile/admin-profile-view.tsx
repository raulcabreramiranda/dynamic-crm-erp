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

import { IAdminProfile } from 'src/components/models/AdminProfile/admin-profile-model';

import EntityContext from 'src/components/contexts/AdminProfile/admin-profile-context';

const ViewForm = () => {
    const { viewTabActive, setViewTabActive } = useContext(EntityContext);

    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="admin-profile-name"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="name"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'name' }} contentKey="adminProfile.name" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  nameFormValue: evt.target.value })} 
            value={state.nameFormValue ? state.nameFormValue : ""}
            id="admin-profile-name" 
            entityContext={EntityContext}
            type="text" 
            name="name" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <ViewSelectMany
                                id="admin-profile-adminPermissionProfiles-form"
                                options={[]}
                                entityContext={EntityContext}
                                relationshipType={'one-to-many'}
                                optionsLink={'admin-permission-profiles'}
                                optionsSort={{ id: 'asc' }}
                                optionsShowFields={['id', 'adminPermission.id', 'adminPermission.name']}
                                name="adminPermissionProfiles"
                                label={
                                    <>
                                        <Translate contentKey="adminProfile.Permisos" />
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

export default ViewForm;
