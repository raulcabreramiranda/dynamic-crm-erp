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

import { ISubsidiary } from 'src/pages/subsidiaries/_base/subsidiary-model';

import { EntityContext } from './subsidiary';

const ViewForm = () => {
    const { viewTabActive, setViewTabActive } = useContext(EntityContext);

    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="subsidiary-commercialName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="commercialName"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Nome comercial' }} contentKey="subsidiary.commercialName" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  commercialNameFormValue: evt.target.value })} 
            value={state.commercialNameFormValue ? state.commercialNameFormValue : ""}
            id="subsidiary-commercialName" 
            entityContext={EntityContext}
            type="text" 
            name="commercialName" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="subsidiary-corporateName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="corporateName"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Razão social' }} contentKey="subsidiary.corporateName" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  corporateNameFormValue: evt.target.value })} 
            value={state.corporateNameFormValue ? state.corporateNameFormValue : ""}
            id="subsidiary-corporateName" 
            entityContext={EntityContext}
            type="text" 
            name="corporateName" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="subsidiary-cnpj"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cnpj"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'CNPJ' }} contentKey="subsidiary.cnpj" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  cnpjFormValue: evt.target.value })} 
            value={state.cnpjFormValue ? state.cnpjFormValue : ""}
            id="subsidiary-cnpj" 
            entityContext={EntityContext}
            type="text" 
            name="cnpj" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="subsidiary-telephone"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="telephone"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Telefone' }} contentKey="subsidiary.telephone" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  telephoneFormValue: evt.target.value })} 
            value={state.telephoneFormValue ? state.telephoneFormValue : ""}
            id="subsidiary-telephone" 
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
                                    id="subsidiary-email"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="email"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'E-mail' }} contentKey="subsidiary.email" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  emailFormValue: evt.target.value })} 
            value={state.emailFormValue ? state.emailFormValue : ""}
            id="subsidiary-email" 
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
                                    id="subsidiary-address"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="address"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Endereço' }} contentKey="subsidiary.address" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  addressFormValue: evt.target.value })} 
            value={state.addressFormValue ? state.addressFormValue : ""}
            id="subsidiary-address" 
            entityContext={EntityContext}
            type="text" 
            name="address" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="subsidiary-cnae"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cnae"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'E-mailCnae' }} contentKey="subsidiary.cnae" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  cnaeFormValue: evt.target.value })} 
            value={state.cnaeFormValue ? state.cnaeFormValue : ""}
            id="subsidiary-cnae" 
            entityContext={EntityContext}
            type="text" 
            name="cnae" 
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
