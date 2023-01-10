export const translate = (
  contentKey: string,
  interpolate?: any,
  children?: string
) => contentKey.split('.').slice(-1).pop();

export const Translate = (props: {
  contentKey: string;
  interpolate?: any;
  children?: string;
}) => {
  return <>{translate(props.contentKey)}</>;
};

// export const translate = (
//   t: Function,
//   contentKey: string,
//   interpolate?: any,
//   children?: string
// ) => {
//   if (
//     typeof t === 'function' &&
//     contentKey.includes &&
//     contentKey.includes('.')
//   ) {
//     const transValue = t(
//       [
//         'adminTranslations:' + contentKey,
//         contentKey.split('.')[0] + ':' + contentKey,
//       ],
//       interpolate
//     );
//     return transValue;
//   } else {
//     return contentKey;
//   }
// };

// export const dangerouslySetInnerHTML = (contentKey: string, max = 150) => {
//   return (
//     <div dangerouslySetInnerHTML={{ __html: contentKey.substring(0, max) }} />
//   );
// };
// export const hasAnyAuthority = (
//   contentKey: any,
//   contentKey1?: any,
//   contentKey2?: any
// ) => {
//   return true;
// };
