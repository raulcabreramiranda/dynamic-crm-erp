import Grid from '@mui/material/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from '@mui/material/CardContent';

import InputBoolean from 'src/layouts/components/inputs/InputBoolean';
import InputDate from 'src/layouts/components/inputs/InputDate';
import InputText from 'src/layouts/components/inputs/InputText';
import InputSelect from 'src/layouts/components/inputs/InputSelect';
import InputSelectMany from 'src/layouts/components/inputs/InputSelectMany';
import InputImage from 'src/layouts/components/inputs/InputImage';
import { EntityContext } from './admin-white-label';

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
                                        id="admin-white-label-name"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="name"
                                        label={
                                            <>
                                                <Translate contentKey="adminWhiteLabel.name" />
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
            </CardContent>
        </>
    );
};

export default FormUpdate;
