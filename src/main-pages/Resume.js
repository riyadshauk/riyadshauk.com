// @flow
import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
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
      <div>
        <h2>Resume</h2>
        <a href="./resume.pdf">Link to download my Resume</a>
        <Document
          file="./resume.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

export default Resume;