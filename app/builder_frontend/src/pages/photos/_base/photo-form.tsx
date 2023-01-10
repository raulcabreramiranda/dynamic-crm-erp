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
import { EntityContext } from './photo';

const FormUpdate = ({ isNew }: any) => {
    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <InputText
                                    id="photo-title"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="title"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="photo.title" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <InputText
                                    id="photo-description"
                                    entityContext={EntityContext}
                                    type="textarea"
                                    precision={0}
                                    name="description"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="photo.description" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <InputImage
                                    id="photo-link"
                                    entityContext={EntityContext}
                                    widthPreview={'120px'}
                                    heightPreview={'120px'}
                                    name="link"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="photo.link" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <InputSelect
                                    id="photo-typeContent"
                                    options={[
                                        { value: 'TEXT', label: translate('photo.TypeContent.TEXT') },
                                        { value: 'PRESENTATION', label: translate('photo.TypeContent.PRESENTATION') },
                                        { value: 'DEEPENING', label: translate('photo.TypeContent.DEEPENING') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="typeContent"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate contentKey="photo.typeContent" />
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
