import { Button as PrimeButton } from 'primereact/button';

interface Props {
    icon?: string;
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Button = (props: any) => {
    return <PrimeButton  type="button" label={props.children} icon={`pi pi-${props.icon}`} onClick={()=>{
       props.onClick()
        console.info("asdasdasd");
    }} className={`${props.className || ''} mr-2`} />;
};

export default Button;
