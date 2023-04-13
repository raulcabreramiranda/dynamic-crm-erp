interface Props {
    container?: boolean;
    spacing?: number;
    item?: boolean;
    xs?: number;
    md?: number;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Grid = (props: Props) => {
    if (props.container) {
        return <div  className="grid">{props.children}</div>;
    }
    return <div className={`col-${props.xs}`}>{props.children}</div>;
};

export default Grid;
