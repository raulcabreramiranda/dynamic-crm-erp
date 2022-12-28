// export const getServerSideProps = (context: any) => require('./_base/jorney').getServerSideProps(context);

import {Jorney as JorneyBase} from './_base/jorney';

export default function Jorney(props: any) {

    return JorneyBase(props).return();
}
