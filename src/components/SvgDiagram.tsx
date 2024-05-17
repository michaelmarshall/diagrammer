import React, { useState, useEffect, useRef } from "react";
import * as jsonpath from "jsonpath";

interface SvgDiagramProps {
  jsonData: any;
}

const SvgDiagram: React.FC<SvgDiagramProps> = ({ jsonData }) => {
  const [rectangles, setRectangles] = useState<JSX.Element[]>([]);
  const scrollableRef = useRef<HTMLDivElement>(null);

  let counter = 1;

  let result: any;
  const canvasWidth = 2500;
  const canvasHeight = 2500;

  if (jsonData) {
    result = jsonpath.query(jsonData, "$..VisualDictionary[0]");
  }
  // console.log(result);

  const iterateJsonObject = (obj: any, x: number, y: number) => {
    if (obj) {
      Object.entries(obj).forEach(([key, value], index) => {
        counter++;
        const rect = (
          <rect
            key={`${x}-${y}-${counter}`}
            width="10"
            height="10"
            x={canvasWidth - (x + counter * 12)}
            y={y}
            fill="blue"
          />
        );
        setRectangles((prevRectangles) => [...prevRectangles, rect]);

        if (typeof value === "object" && value !== null) {
          iterateJsonObject(value, x + 12, y + 12); // Recursively iterate nested objects
        }
      });
    }
  };

  useEffect(() => {
    if (scrollableRef.current){
      scrollableRef.current.scrollLeft = scrollableRef.current.scrollWidth;
    }
  });

  useEffect(() => {
    setRectangles([]);
    iterateJsonObject(jsonData, 10, 10);
  }, [jsonData]);

  return (
    <div className="svg-container" ref={scrollableRef}>
      {/* {result && JSON.stringify(result)} */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={canvasWidth}
        height={canvasHeight}
      >
        {rectangles}
      </svg>
    </div>
  );
};

export default SvgDiagram;
