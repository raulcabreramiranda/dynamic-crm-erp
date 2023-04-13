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

import { IProfessional } from 'src/pages/professionals/_base/professional-model';

import { EntityContext } from './professional';

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
                                    id="professional-name"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="name"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Nome' }} contentKey="professional.name" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  nameFormValue: evt.target.value })} 
            value={state.nameFormValue ? state.nameFormValue : ""}
            id="professional-name" 
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
                                <ViewDate
                                    id="professional-birthDate"
                                    entityContext={EntityContext}
                                    name="birthDate"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Data de nascimento' }} contentKey="professional.birthDate" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="professional-cpf"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cpf"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Cpf' }} contentKey="professional.cpf" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  cpfFormValue: evt.target.value })} 
            value={state.cpfFormValue ? state.cpfFormValue : ""}
            id="professional-cpf" 
            entityContext={EntityContext}
            type="text" 
            name="cpf" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="professional-rg"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="rg"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Rg' }} contentKey="professional.rg" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  rgFormValue: evt.target.value })} 
            value={state.rgFormValue ? state.rgFormValue : ""}
            id="professional-rg" 
            entityContext={EntityContext}
            type="text" 
            name="rg" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="professional-telephone"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="telephone"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Celular' }} contentKey="professional.telephone" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  telephoneFormValue: evt.target.value })} 
            value={state.telephoneFormValue ? state.telephoneFormValue : ""}
            id="professional-telephone" 
            entityContext={EntityContext}
            type="text" 
            name="telephone" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="professional-email"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="email"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'E-mail' }} contentKey="professional.email" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  emailFormValue: evt.target.value })} 
            value={state.emailFormValue ? state.emailFormValue : ""}
            id="professional-email" 
            entityContext={EntityContext}
            type="text" 
            name="email" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="professional-contract"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="contract"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Contrato' }} contentKey="professional.contract" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  contractFormValue: evt.target.value })} 
            value={state.contractFormValue ? state.contractFormValue : ""}
            id="professional-contract" 
            entityContext={EntityContext}
            type="text" 
            name="contract" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewDate
                                    id="professional-startDate"
                                    entityContext={EntityContext}
                                    name="startDate"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Data de início' }} contentKey="professional.startDate" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewDate
                                    id="professional-endDate"
                                    entityContext={EntityContext}
                                    name="endDate"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Data de término' }} contentKey="professional.endDate" />
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
