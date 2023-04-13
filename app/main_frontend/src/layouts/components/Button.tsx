import { useRouter } from 'next/router';
import { Button as PrimeButton } from 'primereact/button';

interface Props {
    icon?: string;
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Button = (props: any) => {
    const router = useRouter();

    return <PrimeButton  type="button" label={props.children} icon={`pi pi-${props.icon}`} onClick={()=>{
        if(props.onClick){
            props.onClick()
        } else if(props.href){
            router.push(props.href)
        }
    }} className={`p-button-${props.color || 'primary'} ${props.className || ''} mr-2`} />;
};

export default Button;
