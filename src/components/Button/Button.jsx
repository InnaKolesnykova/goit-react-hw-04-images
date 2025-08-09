import React from "react";
import css from './Button.module.css';

export const Button = ({ onClick }) => (
  <button type="button" className={css.Button} onClick={onClick}>
    Load more
  </button>
);