interface Props {
    className?: string;
    onClose(): void;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const DialogTitle = (props: Props) => {
    return (
        <div style={{ padding: '1.5rem 0' }} className="p-dialog-header">
            <div id="pr_id_2_header" className="p-dialog-title">
                {props.children}
            </div>
            <div className="p-dialog-header-icons">
                <button type="button" className="p-dialog-header-icon p-dialog-header-close p-link" aria-label="Close">
                    <span onClick={()=>props.onClose()} className="p-dialog-header-close-icon pi pi-times" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    );
};

export default DialogTitle;
