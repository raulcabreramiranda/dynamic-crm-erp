interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const DialogContentText = (props: Props) => {
    return (
        <div className={`card ${props.className || ""}`}>
           {props.children}
        </div>
    );
};

export default DialogContentText;
