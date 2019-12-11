// @flow
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { FlashyAnchorContainer, Page as PageContainer } from '../styles';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => setNumPages(numPages);

  return (
    <PageContainer>
      <h2>Resume</h2>
      <FlashyAnchorContainer>
        Links to download by Resume:
          &nbsp;
					<a href="/resume.pdf">PDF</a>
        &nbsp;
					<a href="/resume.docx" download="Resume Riyad Shauk.docx">DOCX</a>
      </FlashyAnchorContainer>
      <Document
        file="/resume.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </PageContainer>
  );
}

export default Resume;