// @flow
import React, { Fragment, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'; //'react-pdf/dist/entry.parcel';
import styled from 'styled-components';
import { FlashyAnchorContainer, Page as PageContainer } from '../styles';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResumeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow-x: auto; */
`;

const Resume = () => {
  const [ , setNumPages] = useState(null);
  const [pageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }

  return (
    <Fragment>
      <FlashyAnchorContainer>
        {'Links: '}
          <a href="/resume.pdf">PDF</a>
            {' '}
          <a href="/resume.docx" download="Resume Riyad Shauk.docx">DOCX</a>
      </FlashyAnchorContainer>
      <PageContainer>
        <h2>Resume</h2>
        <ResumeContainer>
          <Document
            file="/resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </ResumeContainer>
      </PageContainer>
    </Fragment>
  );
}

export default Resume;