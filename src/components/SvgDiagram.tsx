import React, { useState, useEffect } from "react";

interface SvgDiagramProps {
  jsonData: any;
}

const SvgDiagram: React.FC<SvgDiagramProps> = ({ jsonData }) => {
  const [rectangles, setRectangles] = useState<JSX.Element[]>([]);
  let counter = 1;

  const iterateJsonObject = (obj: any, x: number, y: number) => {

    if (obj) {
      Object.entries(obj).forEach(([key, value], index) => {
        counter++
        const rect = (
          <rect
            key={`${x}-${y}-${counter}`}
            width="10"
            height="10"
            x={x + counter * 12}
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
    setRectangles([])
    iterateJsonObject(jsonData, 10, 10);
  }, [jsonData]);

  return (
    <div className="svg-container">
      <svg xmlns="http://www.w3.org/2000/svg" width={1500} height={1000}>
        {rectangles}
      </svg>
    </div>
  );
};

export default SvgDiagram;