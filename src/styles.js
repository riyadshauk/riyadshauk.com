import styled from 'styled-components';

export const AnchorContainer = styled.div`
  a:hover {
    background-color: lightcyan;
    color: lightcoral;
    text-decoration: none;
  }
  padding-top: 5px;
  padding-bottom: 10px;
`;

export const IframeContainer = styled.div`
  background-color: white;
`;

export const Page = styled.div`
  padding-left: 50px;
`;

export const UnorderedList = styled.ul`
  display: flex;
  padding-left: 0px;
  a {
    color: black;
    text-decoration: none;
    padding: 10px;
  }
`;

export const Link = styled.li`
  display: flex;
  :hover {
    background-color: lightcyan;
  }
  a:hover {
    color: lightcoral;
  }
`;