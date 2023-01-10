import { Context, ReactElement, useContext } from 'react';
import Typography from '../Typography'

interface Props {
    entityContext: Context<any>;
    options: any[];
    label: string | ReactElement
    name: string;
}

const InputSelect = ({ options, label, name, entityContext: EntityContext }: Props) => {
    const { entityView } = useContext(EntityContext);
    const fieldName = typeof name !== 'undefined' ? name : '';

    return (
        <>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
                <b>{label}</b>
            </Typography>
            <Typography variant="subtitle2" sx={{ mr: 2 }}>
                {entityView[fieldName]}
            </Typography>
        </>
    );
};

export default InputSelect;
