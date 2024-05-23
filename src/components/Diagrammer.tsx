import React, { useState } from "react";
import yaml from "js-yaml";
import YamlEditor from "./YamlEditor";
import JsonViewer from "./JsonViewer";
import SvgDiagram from "./SvgDiagram";
import { defaultText } from "../common/defaultYaml";
import HtmlDiagram from "./HtmlDiagram";

const Diagrammer: React.FC = () => {
  const [yamlText, setYamlText] = useState<string>(defaultText);
  const [jsonData, setJsonData] = useState<object | null>(null);
  const [errorData, setErrorData] = useState<string | null>(null);

  const handleYamlChange = (newYamlText: string) => {
    setYamlText(newYamlText);

    try {
      const parsedJson = yaml.load(newYamlText);
      setJsonData(parsedJson as {});
      setErrorData(null);
    } catch (error) {
      // console.error("Error parsing YAML:", error);
      setErrorData((error as any).reason);
    }
  };

  return (
    <div>
      <h1>Hebrew Diagrammer</h1>

      <div className="yaml-container">
        <YamlEditor yamlText={yamlText} onYamlChange={handleYamlChange} />
      </div>

      <div>
        <div className="error-container">
          {errorData}
        </div>
      </div>

      <div>
        <div className="json-container">
          {jsonData ? (
            <JsonViewer jsonData={jsonData} />
          ) : (
            <p>No valid YAML data</p>
          )}
        </div>
      </div>

      {/* <div className="html-diagram">
        <HtmlDiagram jsonData={jsonData} />
      </div> */}

      <div>
        <SvgDiagram jsonData={jsonData} />
      </div>
    </div>
  );
};

export default Diagrammer;
