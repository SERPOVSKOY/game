import { css } from '@mui/material';

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    width: 100%;
    height: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
