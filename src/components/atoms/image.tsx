import  React from 'react';

export const Image = (props: any) => {
    return (
      <img
        src={props.baseUrl + "original.webp"}
        srcSet={
        props.baseUrl + "567w.webp 567w" + "," +
        props.baseUrl + "768w.webp 768w" + "," +
        props.baseUrl + "992w.webp 992w"
        }
        sizes="(max-width: 567px) 567w,
        (max-width: 768px) 768w,
        (max-width: 992px) 992w"
        alt={props.alt}
        loading={props.loading}
        className={props.className}
    />
    );
  };