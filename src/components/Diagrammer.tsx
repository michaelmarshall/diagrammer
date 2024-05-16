import React, { useState } from 'react';
import YamlEditor from './YamlEditor';

const Diagrammer: React.FC = () => {
  const [yamlText, setYamlText] = useState<string>('');

  const handleYamlChange = (newYamlText: string) => {
    setYamlText(newYamlText);
  };

  return (
    <div>
      <h1>Diagrammer</h1>
      <YamlEditor yamlText={yamlText} onYamlChange={handleYamlChange} />
      <div>
        <h3>YAML Text:</h3>
        <pre>{yamlText}</pre>
      </div>
    </div>
  );
};

export default Diagrammer;