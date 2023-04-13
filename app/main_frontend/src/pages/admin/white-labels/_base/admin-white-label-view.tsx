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

import { IAdminWhiteLabel } from 'src/pages/admin/white-labels/_base/admin-white-label-model';

import { EntityContext } from './admin-white-label';

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
                                    id="admin-white-label-name"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="name"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'name' }} contentKey="adminWhiteLabel.name" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  nameFormValue: evt.target.value })} 
            value={state.nameFormValue ? state.nameFormValue : ""}
            id="admin-white-label-name" 
            entityContext={EntityContext}
            type="text" 
            name="name" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ViewForm;
