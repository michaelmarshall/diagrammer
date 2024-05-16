import React from 'react';

interface JsonViewerProps {
  jsonData: object;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData }) => {
  return (
    <div>
      <h2>JSON Viewer</h2>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default JsonViewer;