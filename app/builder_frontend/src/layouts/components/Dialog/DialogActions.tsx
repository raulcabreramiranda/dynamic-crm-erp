interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const DialogActions = (props: Props) => {
    return (
        <div className={`p-toolbar ${props.className || ''}`}>
            <hr />
            <div className="p-toolbar-group-right">{props.children}</div>
        </div>
    );
};

export default DialogActions;
