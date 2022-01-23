import styled, {css} from 'styled-components';

export const Container = styled.nav`
    width: 100%;
    height: 10vh;
    background: black;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 10%;
    background-color: #030033;
    box-shadow: 0px 0px 20px 0;
    color: white;
`;

const baseCss = css`
    display: flex;
    align-items: center;
`
export const Wrapper = styled.div`
    ${baseCss}
    justify-content: space-around;
`;

export const WapperInfoNavBar = styled.div`
    ${baseCss}
    justify-content: space-between;
    width: 25%;
`;
