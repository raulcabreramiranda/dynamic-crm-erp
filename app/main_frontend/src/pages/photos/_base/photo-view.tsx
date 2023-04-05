import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';

import ViewBoolean from 'src/layouts/components/inputs/ViewBoolean';
import ViewDate from 'src/layouts/components/inputs/ViewDate';
import ViewText from 'src/layouts/components/inputs/ViewText';
import ViewSelect from 'src/layouts/components/inputs/ViewSelect';
import ViewSelectMany from 'src/layouts/components/inputs/ViewSelectMany';
import ViewImage from 'src/layouts/components/inputs/ViewImage';

import { IPhoto } from 'src/pages/photos/_base/photo-model';

import { EntityContext } from './photo';

const ViewForm = () => {
    return (
        <>
            <CardContent>
                <form>
                    <Grid container spacing={7}>
                        <Grid item xs={12}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="photo-title"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="title"
                                        label={
                                            <>
                                                <Translate contentKey="photo.title" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  titleFormValue: evt.target.value })} 
            value={state.titleFormValue ? state.titleFormValue : ""}
            id="photo-title" 
            entityContext={EntityContext}
            type="text" 
            name="title" 
            className={"form-control"} 
             
          /> */}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="photo-description"
                                        entityContext={EntityContext}
                                        type="textarea"
                                        name="description"
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
                                    <ViewImage
                                        id="photo-link"
                                        entityContext={EntityContext}
                                        widthPreview={'100%'}
                                        heightPreview={'auto'}
                                        name="link"
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
                                    <ViewSelect
                                        id="photo-typeContent"
                                        options={[
                                            { value: 'TEXT', label: translate('photo.PhotoTypeContent.TEXT') },
                                            { value: 'PRESENTATION', label: translate('photo.PhotoTypeContent.PRESENTATION') },
                                            { value: 'DEEPENING', label: translate('photo.PhotoTypeContent.DEEPENING') },
                                        ]}
                                        entityContext={EntityContext}
                                        name="typeContent"
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
            </CardContent>
        </>
    );
};

export default ViewForm;
