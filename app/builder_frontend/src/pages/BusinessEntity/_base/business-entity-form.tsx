import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';

import InputBoolean from 'src/layouts/components/inputs/InputBoolean';
import InputDate from 'src/layouts/components/inputs/InputDate';
import InputText from 'src/layouts/components/inputs/InputText';
import InputSelect from 'src/layouts/components/inputs/InputSelect';
import InputSelectMany from 'src/layouts/components/inputs/InputSelectMany';
import InputImage from 'src/layouts/components/inputs/InputImage';
import InputSuperSelect from 'src/layouts/components/modal-super-select/InputSuperSelect';
import { EntityContext } from './business-entity-update';

const FormUpdate = ({ isNew }: any) => {
    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputText
                                    id="business-entity-entityName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="entityName"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="businessEntity.entityName" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div>
                            <Grid>
                                <InputText
                                    id="business-entity-entityNameHumanized"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="entityNameHumanized"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="businessEntity.entityNameHumanized" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={5}>
                        <div>
                            <Grid>
                                <InputText
                                    id="business-entity-entityNameHumanizedPlural"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="entityNameHumanizedPlural"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="businessEntity.entityNameHumanizedPlural" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputBoolean
                                    id="business-entity-hasWhiteLabel"
                                    options={[
                                        { value: true, label: translate('businessEntity.hasWhiteLabel.YES') },
                                        { value: false, label: translate('businessEntity.hasWhiteLabel.NOT') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="hasWhiteLabel"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="businessEntity.hasWhiteLabel" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputBoolean
                                    id="business-entity-hasDateAudit"
                                    options={[
                                        { value: true, label: translate('businessEntity.hasDateAudit.YES') },
                                        { value: false, label: translate('businessEntity.hasDateAudit.NOT') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="hasDateAudit"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="businessEntity.hasDateAudit" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputText
                                    id="business-entity-frontPath"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="frontPath"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="businessEntity.frontPath" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <InputSelectMany
                                id="business-entity-businessEntityField-form"
                                options={[]}
                                entityContext={EntityContext}
                                relationshipType={'one-to-many'}
                                optionsLink={'business-entity-fields'}
                                optionsSort={{ fieldName: 'asc' }}
                                optionsShowFields={['fieldName', 'fieldNameHumanized']}
                                name="businessEntityField"
                                label={
                                    <>
                                        <Translate contentKey="businessEntity.Fields" />
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

export default FormUpdate;
