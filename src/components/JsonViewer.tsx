import React from 'react';

interface JsonViewerProps {
  jsonData: object;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData }) => {
  return (
    <div>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default JsonViewer;