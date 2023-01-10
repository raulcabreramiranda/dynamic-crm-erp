interface Props {
    id?: string | number
    htmlFor?: string
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Label = (props: Props) => {
    return (
        <label htmlFor={props.htmlFor}>
           {props.children}
        </label>
    );
};

export default Label;
