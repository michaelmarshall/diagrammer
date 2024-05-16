import React, { useState } from "react";
import yaml from "js-yaml";
import YamlEditor from "./YamlEditor";
import JsonViewer from "./JsonViewer";
import SvgDiagram from "./SvgDiagram";
import { defaultText } from "./common";

const Diagrammer: React.FC = () => {
  const [yamlText, setYamlText] = useState<string>(defaultText);
  const [jsonData, setJsonData] = useState<object | null>(null);

  const handleYamlChange = (newYamlText: string) => {
    setYamlText(newYamlText);

    try {
      const parsedJson = yaml.load(newYamlText);
      setJsonData(parsedJson as {});
    } catch (error) {
      console.error("Error parsing YAML:", error);
      setJsonData(error as {});
    }
  };

  return (
    <div>
      <h1>Diagrammer</h1>

      <div className="editor-half">
        <div>
          <YamlEditor yamlText={yamlText} onYamlChange={handleYamlChange} />
        </div>

        <div className="json-container">
          {jsonData ? (
            <JsonViewer jsonData={jsonData} />
          ) : (
            <p>No valid YAML data</p>
          )}
        </div>
      </div>

      <div>
        <SvgDiagram jsonData={jsonData} />
      </div>
    </div>
  );
};

export default Diagrammer;
