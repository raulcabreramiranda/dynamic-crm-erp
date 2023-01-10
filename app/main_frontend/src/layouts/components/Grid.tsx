interface Props {
    container?: boolean;
    spacing?: number;
    item?: boolean;
    xs?: number;
    md?: number;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Grid = (props: Props) => {
    return (
        <div>
           { props.children }
        </div>
    );
};

export default Grid;
