import React, { useState, useEffect } from "react";

interface HtmlDiagramProps {
  jsonData: any;
}

const HtmlDiagram: React.FC<HtmlDiagramProps> = ({ jsonData }) => {
  const [nestedDivs, setNestedDivs] = useState<JSX.Element | null>(null);
  let counter = 1;

  const iterateJsonObject = (obj: any, parentKey: string = ""): JSX.Element => {
    if (obj) {
      return (
        <div key={`${parentKey}-${counter}`}>
          {Object.entries(obj).map(([key, value]) => {
            counter++;
            if (typeof value === "object" && value !== null) {
              return (
                <div key={`${parentKey}-${key}-${counter}`}>
                  {key}
                  {iterateJsonObject(value, `${parentKey}-${key}`)}
                </div>
              );
            } else {
              return (
                <div key={`${parentKey}-${key}-${counter}`}>
                  <span>{`${key}: ${value}`}</span>
                </div>
              );
            }
          })}
        </div>
      );
    }
    return <></>;
  };

  useEffect(() => {
    const nestedDivs = iterateJsonObject(jsonData);
    setNestedDivs(nestedDivs);
  }, [jsonData]);

  return <div className="html-container">{nestedDivs}</div>;
};

export default HtmlDiagram;