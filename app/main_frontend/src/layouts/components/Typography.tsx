interface Props {
    variant?: string;
    sx?: any;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Typography = (props: Props) => {
    return (
        <span>
           {props.children}
        </span>
    );
};

export default Typography;
