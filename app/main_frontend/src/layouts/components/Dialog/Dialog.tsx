import { Dialog as PrimeDialog } from 'primereact/dialog';
interface Props {
    className?: string;
    isOpen?: boolean;
    onClose(): void;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Dialog = (props: Props) => {
    return (
        <PrimeDialog visible={props.isOpen} style={{ width: '90%' }} showHeader={false}  modal onHide={()=>props.onClose()}>
            {props.children}
        </PrimeDialog>
    );
};

export default Dialog;
