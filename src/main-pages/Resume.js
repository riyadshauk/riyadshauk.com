// @flow
import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { AnchorContainer, Page as PageContainer } from '../styles';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {};
type State = {
  numPages: any,
  pageNumber: number
};

class Resume extends Component<Props, State> {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <PageContainer>
        <h2>Resume</h2>
        <AnchorContainer>
          <a href="/resume.pdf">Link to download my Resume</a>
        </AnchorContainer>
        <Document
          file="/resume.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </PageContainer>
    );
  }
}

export default Resume;