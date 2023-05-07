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

import { ICustomer } from 'src/components/models/Customer/customer-model';

import EntityContext from 'src/components/contexts/Customer/customer-context';

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
                                    id="customer-commercialName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="commercialName"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Nome comercial' }} contentKey="customer.commercialName" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  commercialNameFormValue: evt.target.value })} 
            value={state.commercialNameFormValue ? state.commercialNameFormValue : ""}
            id="customer-commercialName" 
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
                                    id="customer-corporateName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="corporateName"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Razão social' }} contentKey="customer.corporateName" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  corporateNameFormValue: evt.target.value })} 
            value={state.corporateNameFormValue ? state.corporateNameFormValue : ""}
            id="customer-corporateName" 
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
                                    id="customer-cnpj"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cnpj"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'CNPJ' }} contentKey="customer.cnpj" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  cnpjFormValue: evt.target.value })} 
            value={state.cnpjFormValue ? state.cnpjFormValue : ""}
            id="customer-cnpj" 
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
                                    id="customer-cpf"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cpf"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'CPF' }} contentKey="customer.cpf" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  cpfFormValue: evt.target.value })} 
            value={state.cpfFormValue ? state.cpfFormValue : ""}
            id="customer-cpf" 
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
                                    id="customer-telephone"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="telephone"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Telefone' }} contentKey="customer.telephone" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  telephoneFormValue: evt.target.value })} 
            value={state.telephoneFormValue ? state.telephoneFormValue : ""}
            id="customer-telephone" 
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
                                    id="customer-email"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="email"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'E-mail' }} contentKey="customer.email" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  emailFormValue: evt.target.value })} 
            value={state.emailFormValue ? state.emailFormValue : ""}
            id="customer-email" 
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
                                    id="customer-address"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="address"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Endereço' }} contentKey="customer.address" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  addressFormValue: evt.target.value })} 
            value={state.addressFormValue ? state.addressFormValue : ""}
            id="customer-address" 
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
                                    id="customer-technicalManagerName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerName"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (Nome)' }} contentKey="customer.technicalManagerName" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  technicalManagerNameFormValue: evt.target.value })} 
            value={state.technicalManagerNameFormValue ? state.technicalManagerNameFormValue : ""}
            id="customer-technicalManagerName" 
            entityContext={EntityContext}
            type="text" 
            name="technicalManagerName" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="customer-technicalManagerSector"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerSector"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (Setor)' }} contentKey="customer.technicalManagerSector" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  technicalManagerSectorFormValue: evt.target.value })} 
            value={state.technicalManagerSectorFormValue ? state.technicalManagerSectorFormValue : ""}
            id="customer-technicalManagerSector" 
            entityContext={EntityContext}
            type="text" 
            name="technicalManagerSector" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="customer-technicalManagerFunction"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerFunction"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (Função)' }} contentKey="customer.technicalManagerFunction" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  technicalManagerFunctionFormValue: evt.target.value })} 
            value={state.technicalManagerFunctionFormValue ? state.technicalManagerFunctionFormValue : ""}
            id="customer-technicalManagerFunction" 
            entityContext={EntityContext}
            type="text" 
            name="technicalManagerFunction" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="customer-technicalManagerContact"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerContact"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (Contato)' }} contentKey="customer.technicalManagerContact" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  technicalManagerContactFormValue: evt.target.value })} 
            value={state.technicalManagerContactFormValue ? state.technicalManagerContactFormValue : ""}
            id="customer-technicalManagerContact" 
            entityContext={EntityContext}
            type="text" 
            name="technicalManagerContact" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="customer-technicalManagerEmail"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerEmail"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (E-mail)' }} contentKey="customer.technicalManagerEmail" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  technicalManagerEmailFormValue: evt.target.value })} 
            value={state.technicalManagerEmailFormValue ? state.technicalManagerEmailFormValue : ""}
            id="customer-technicalManagerEmail" 
            entityContext={EntityContext}
            type="text" 
            name="technicalManagerEmail" 
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
