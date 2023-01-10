interface Props {
    className?: string;
    title?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
    buttons?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const CardHeader = (props: Props) => {
    return (
        <div className={`card ${props.className || ''}`}>
            <div className={`p-toolbar p-component`}>
                <div className="p-toolbar-group-left">{props.title}</div>
                <div className="p-toolbar-group-right">{props.buttons}</div>
            </div>
        </div>
    );
};

export default CardHeader;
