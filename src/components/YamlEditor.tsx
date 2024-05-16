import React, { ChangeEvent } from 'react';

interface YamlEditorProps {
  yamlText: string;
  onYamlChange: (newYamlText: string) => void;
}

const YamlEditor: React.FC<YamlEditorProps> = ({ yamlText, onYamlChange }) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onYamlChange(event.target.value);
  };

  return (
    <div>
      <h2>YAML Editor</h2>
      <textarea
        rows={10}
        cols={50}
        value={yamlText}
        onChange={handleChange}
        placeholder="Enter your YAML document here..."
      />
    </div>
  );
};

export default YamlEditor;