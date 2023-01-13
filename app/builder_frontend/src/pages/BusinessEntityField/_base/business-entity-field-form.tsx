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

import { EntityContext } from './business-entity-field';

const FormUpdate = ({ isNew }: any) => {
    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputText
                                    id="business-entity-field-fieldName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="fieldName"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="businessEntityField.fieldName" />
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
                                    id="business-entity-field-fieldNameHumanized"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="fieldNameHumanized"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="businessEntityField.fieldNameHumanized" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputSelect
                                    id="business-entity-field-fieldType"
                                    options={[
                                        { value: 'FRONT', label: translate('businessEntityField.BusinessEntityFieldFieldType.FRONT') },
                                        { value: 'END', label: translate('businessEntityField.BusinessEntityFieldFieldType.END') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="fieldType"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="businessEntityField.fieldType" />
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

export default FormUpdate;
