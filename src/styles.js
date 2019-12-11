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

export const FlashyAnchorContainer = styled.div`
  a {
    background-color: #4797D5;
    color: #DBAB49;
    text-decoration: none;
    border: 1px solid #4797D5;
    border-radius: 25px;
    padding: 2px 5px;
  }
  a:hover {
    background-color: lightcyan;
    color: lightcoral;
    text-decoration: none;
    border: 1px solid lightcyan;
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
    color: #0156A6;
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