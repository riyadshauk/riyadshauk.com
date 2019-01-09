// @flow
import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/styles/hljs';

const CodeSnippet = (code: string, language: string = 'javascript') => {
  return <SyntaxHighlighter useInlineStyles="false" language={language} style={rainbow}>{code.trim()}</SyntaxHighlighter>;  
}
export default CodeSnippet;