import { assestBasePath } from 'src/util/entity-utils';
import Grid from '../Grid';

interface Props {
    entityView: any;
    name: string;
    widthPreview: string;
    heightPreview: string;
}

const TableImage = ({ name, widthPreview, heightPreview, entityView }: Props) => {
    const fieldName = typeof name !== 'undefined' ? name : '';

    return (
        <Grid>
            <img
                style={{
                    width: widthPreview,
                    height: heightPreview,
                  //  marginRight: theme.spacing(6.25),
                  //  borderRadius: theme.shape.borderRadius
                }}
                src={assestBasePath(entityView[fieldName])}
                alt="Profile Pic"
            />
        </Grid>
    );
};

export default TableImage;
