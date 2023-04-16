import { useRouter } from 'next/router';
import { Button as PrimeButton } from 'primereact/button';
import { getLoggedUser } from 'src/util/entity-utils';

interface Props {
    isLink?: boolean;
    href?: string;
    size?: string;
    color?: string;
    permissionSession?: string;
    permissionMethod?: string;
    icon?: string;
    className?: string;
    onClick?: Function;
    children?: any;
}

const Button = (props: Props) => {
    const router = useRouter();
    
    if(props.permissionMethod && props.permissionSession){
        const loggedUser = getLoggedUser();
        const permissionsUser = loggedUser['adminProfile']?.['adminPermissionProfiles'].map((v) => `${v.adminPermission.session}---${v.adminPermission.method}`);
        const permissionButton = `${props.permissionSession}---${props.permissionMethod}`;
        if(!permissionsUser?.includes(permissionButton)){
            return <></>
        }
    }

    return (
        <PrimeButton
            type="button"
            label={props.children || ''}
            icon={`pi pi-${props.icon}`}
            onClick={() => {
                if (props.onClick) {
                    props.onClick();
                } else if (props.href) {
                    router.push(props.href);
                }
            }}
            className={`p-button-${props.color || 'primary'} ${props.className || ''} mr-2`}
        />
    );
};

export default Button;
