import React from "react";
import { DNA } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={css.loaderBox}>
        <div className={css.DNABox}>
        <DNA
            visible={true}
            height="180"
            width="180"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            position="absolute"
            top="280px"
            />
        </div></div>
    )
}