import LinkAux from 'next/link';
import { useTranslation as useTranslationAux } from 'next-i18next';

export const Link = LinkAux;
export const useTranslation = useTranslationAux;

export const baseTrans = (
  contentKey: string,
  interpolate?: any,
  children?: string
) => contentKey.split('.').slice(-1);

export const Translate = (props: {
  t: Function;
  contentKey: string;
  interpolate?: any;
  children?: string;
}) => {
  return (
    <span
      trans-key={props.contentKey}
      dangerouslySetInnerHTML={{
        __html: translate(
          props.t,
          props.contentKey,
          props.interpolate,
          props.children
        ),
      }}
    />
  );
};

export const translate = (
  t: Function,
  contentKey: string,
  interpolate?: any,
  children?: string
) => {
  if (
    typeof t === 'function' &&
    contentKey.includes &&
    contentKey.includes('.')
  ) {
    const transValue = t(
      [
        'adminTranslations:' + contentKey,
        contentKey.split('.')[0] + ':' + contentKey,
      ],
      interpolate
    );
    return transValue;
  } else {
    return contentKey;
  }
};

export const dangerouslySetInnerHTML = (contentKey: string, max = 150) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: contentKey.substring(0, max) }} />
  );
};
export const hasAnyAuthority = (
  contentKey: any,
  contentKey1?: any,
  contentKey2?: any
) => {
  return true;
};
