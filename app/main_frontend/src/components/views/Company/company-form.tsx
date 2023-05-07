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
import EntityContext from 'src/components/contexts/Company/company-context';

const FormUpdate = ({ isNew }: any) => {
    const { entityEdit, formTabActive, setFormTabActive } = useContext(EntityContext);

    const tabHeaderTemplate = (options: any) => {
        if (isNew) {
            return <div className={options.className}>{options.titleElement}</div>;
        }
        return (
            <Button onClick={options.onClick} className={'p-button p-component p-button-primary p-button-label p-c mr-1 ml-1 mb-2'}>
                {options.titleElement}
            </Button>
        );
    };

    if (!entityEdit || !entityEdit.id) {
        return <> </>;
    }

    return (
        <>
            <form>
                <TabView activeIndex={formTabActive} onTabChange={(e) => setFormTabActive(e.index)}>
                    <TabPanel headerTemplate={tabHeaderTemplate} header={`Base`}>
                        <Grid container spacing={7}>
                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <InputText
                                            id="company-commercialName"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="commercialName"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Nome comercial' }} contentKey="company.commercialName" />
                                                </>
                                            }
                                        />
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <InputText
                                            id="company-corporateName"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="corporateName"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Razão social' }} contentKey="company.corporateName" />
                                                </>
                                            }
                                        />
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <InputText
                                            id="company-cnpj"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="cnpj"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'CNPJ' }} contentKey="company.cnpj" />
                                                </>
                                            }
                                        />
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <InputText
                                            id="company-telephone"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="telephone"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Telefone' }} contentKey="company.telephone" />
                                                </>
                                            }
                                        />
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel headerTemplate={tabHeaderTemplate} header={`Data`}>
                        <Grid container spacing={7}>
                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <InputText
                                            id="company-email"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="email"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'E-mail' }} contentKey="company.email" />
                                                </>
                                            }
                                        />
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <InputText
                                            id="company-address"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="address"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Endereço' }} contentKey="company.address" />
                                                </>
                                            }
                                        />
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <InputText
                                            id="company-cnae"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="cnae"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'E-mailCnae' }} contentKey="company.cnae" />
                                                </>
                                            }
                                        />
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
                                        <InputText
                                            id="company-technicalManagerName"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="technicalManagerName"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Responsável técnico (Nome)' }} contentKey="company.technicalManagerName" />
                                                </>
                                            }
                                        />
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <InputText
                                            id="company-technicalManagerCategory"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="technicalManagerCategory"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Responsável técnico (Nome)' }} contentKey="company.technicalManagerCategory" />
                                                </>
                                            }
                                        />
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <Grid>
                                        <InputText
                                            id="company-technicalManagerBoardNumber"
                                            entityContext={EntityContext}
                                            type="text"
                                            name="technicalManagerBoardNumber"
                                            labelPos="top"
                                            label={
                                                <>
                                                    <Translate label={{ pt: 'Responsável técnico (Nome)' }} contentKey="company.technicalManagerBoardNumber" />
                                                </>
                                            }
                                        />
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

export default FormUpdate;
