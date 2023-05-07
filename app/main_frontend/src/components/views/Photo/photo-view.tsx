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

import { IPhoto } from 'src/components/models/Photo/photo-model';

import EntityContext from 'src/components/contexts/Photo/photo-context';

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
                                    id="photo-title"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="title"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'title' }} contentKey="photo.title" />
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
                                            <Translate label={{ pt: 'description' }} contentKey="photo.description" />
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
                                            <Translate label={{ pt: 'link' }} contentKey="photo.link" />
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
                                            <Translate label={{ pt: 'typeContent' }} contentKey="photo.typeContent" />
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
