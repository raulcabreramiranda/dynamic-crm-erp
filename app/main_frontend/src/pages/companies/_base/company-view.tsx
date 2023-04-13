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

import { ICompany } from 'src/pages/companies/_base/company-model';

import { EntityContext } from './company';

const ViewForm = () => {
    const { viewTabActive, setViewTabActive } = useContext(EntityContext);

    const tabHeaderTemplate = (options) => {
        return (
            <Button onClick={options.onClick} className={'p-button p-component p-button-primary p-button-label p-c mr-1 ml-1 mb-2'}>
                {options.titleElement}
            </Button>
        );
    };

    return (
        <>
            <form>
                <TabView activeIndex={viewTabActive} onTabChange={(e) => setViewTabActive(e.index)}>
                    <TabPanel headerTemplate={tabHeaderTemplate} header={`Base`}>
                        <Grid container spacing={7}>
                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <ViewText
                                            id="company-commercialName"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="commercialName"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Nome comercial' }} contentKey="company.commercialName" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  commercialNameFormValue: evt.target.value })} 
            value={state.commercialNameFormValue ? state.commercialNameFormValue : ""}
            id="company-commercialName" 
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
                                            id="company-corporateName"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="corporateName"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Razão social' }} contentKey="company.corporateName" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  corporateNameFormValue: evt.target.value })} 
            value={state.corporateNameFormValue ? state.corporateNameFormValue : ""}
            id="company-corporateName" 
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
                                            id="company-cnpj"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="cnpj"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'CNPJ' }} contentKey="company.cnpj" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  cnpjFormValue: evt.target.value })} 
            value={state.cnpjFormValue ? state.cnpjFormValue : ""}
            id="company-cnpj" 
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
                                            id="company-telephone"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="telephone"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Telefone' }} contentKey="company.telephone" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  telephoneFormValue: evt.target.value })} 
            value={state.telephoneFormValue ? state.telephoneFormValue : ""}
            id="company-telephone" 
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
                                            id="company-email"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="email"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'E-mail' }} contentKey="company.email" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  emailFormValue: evt.target.value })} 
            value={state.emailFormValue ? state.emailFormValue : ""}
            id="company-email" 
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
                                            id="company-address"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="address"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Endereço' }} contentKey="company.address" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  addressFormValue: evt.target.value })} 
            value={state.addressFormValue ? state.addressFormValue : ""}
            id="company-address" 
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
                                            id="company-cnae"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="cnae"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'E-mailCnae' }} contentKey="company.cnae" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  cnaeFormValue: evt.target.value })} 
            value={state.cnaeFormValue ? state.cnaeFormValue : ""}
            id="company-cnae" 
            entityContext={EntityContext}
            type="text" 
            name="cnae" 
            className={"form-control"} 
             
          /> */}
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel headerTemplate={tabHeaderTemplate} header={`Responsável técnico`}>
                        <Grid container spacing={7}>
                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <ViewText
                                            id="company-technicalManagerName"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="technicalManagerName"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Responsável técnico (Nome)' }} contentKey="company.technicalManagerName" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  technicalManagerNameFormValue: evt.target.value })} 
            value={state.technicalManagerNameFormValue ? state.technicalManagerNameFormValue : ""}
            id="company-technicalManagerName" 
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
                                            id="company-technicalManagerCategory"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="technicalManagerCategory"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Responsável técnico (Nome)' }} contentKey="company.technicalManagerCategory" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  technicalManagerCategoryFormValue: evt.target.value })} 
            value={state.technicalManagerCategoryFormValue ? state.technicalManagerCategoryFormValue : ""}
            id="company-technicalManagerCategory" 
            entityContext={EntityContext}
            type="text" 
            name="technicalManagerCategory" 
            className={"form-control"} 
             
          /> */}
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <ViewText
                                            id="company-technicalManagerBoardNumber"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="technicalManagerBoardNumber"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Responsável técnico (Nome)' }} contentKey="company.technicalManagerBoardNumber" />
                                                </>
                                            }
                                        />
                                        {/* <input
            onChange={evt => setState({ ...state,  technicalManagerBoardNumberFormValue: evt.target.value })} 
            value={state.technicalManagerBoardNumberFormValue ? state.technicalManagerBoardNumberFormValue : ""}
            id="company-technicalManagerBoardNumber" 
            entityContext={EntityContext}
            type="text" 
            name="technicalManagerBoardNumber" 
            className={"form-control"} 
             
          /> */}
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </TabView>
            </form>
        </>
    );
};

export default ViewForm;
