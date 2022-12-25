export const getServerSideProps = (context: any) => require('./_base/jorney-galery').getServerSideProps(context);

export default function JorneyGalery(props: any) {
    const cxt = require('./_base/jorney-galery').JorneyGalery({ ...props });
    return cxt.return();
}
