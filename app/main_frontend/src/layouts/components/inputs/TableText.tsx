import { showFieldsSelectAsync } from 'src/util/entity-utils';
import Typography from '../Typography';

interface Props {
    entityView: any;
    name: string;
    type?: string;
}

const handleChangeByType: any = {
    text: (v: string) => v,
    number: (v: string) => v.replace(/\D/g, ''),
    float: (v: string) => v.replace(/[^\d.-]/g, '')
};

const InputText = ({ entityView, name, type }: Props) => {
    const fieldName = typeof name !== 'undefined' ? name : '';
    const fieldType = type && Object.keys(handleChangeByType).includes(type) ? type : 'text';

    const value = showFieldsSelectAsync(entityView, name);
    // <div dangerouslySetInnerHTML={{ __html: photo.description ? photo.description.replace(/(<([^>]+)>)/gi, '').substring(0, 150) : null }} />
    return (
        <>
            <Typography variant="subtitle2" sx={{ mr: 2 }}>
                {fieldType === 'text' ? value?.substring(0, 150) : value}
            </Typography>
        </>
    );
};

export default InputText;
