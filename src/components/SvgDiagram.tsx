import React, { useState, useEffect, useRef } from "react";
import * as jsonpath from "jsonpath";

interface SvgDiagramProps {
  jsonData: any;
}

const SvgDiagram: React.FC<SvgDiagramProps> = ({ jsonData }) => {
  const [svgElements, setSvgElements] = useState<JSX.Element[]>([]);
  const scrollableRef = useRef<HTMLDivElement>(null);

  let counter = 0;

  // defaults
  const defaultPixelsPerCharacter = 7;
  const defaultFontSize = 15;
  const defaultHeight = 40;
  const defaultColor = "Yellow";

  const canvasWidth = 700;
  const canvasHeight = 700;

  const startingX = 20;
  const startingY = 20;

  const processJsonElement = (
    parent: any,
    key: string,
    value: any,
    grandParent: any = null
  ) => {
    try {
      // if the parent isn't setup, load the defaults for the starting position
      if (parent.showKey === undefined) parent.showKey = false;

      if (parent.pixelsPerCharacter === undefined)
        parent.pixelsPerCharacter = defaultPixelsPerCharacter;
      if (parent.fontSize === undefined) parent.fontSize = defaultFontSize;
      if (parent.color === undefined) parent.color = defaultColor;

      if (parent.width === undefined)
        parent.width = startingX * parent.pixelsPerCharacter;
      if (parent.height === undefined)
        parent.height = startingY * defaultHeight;

      if (parent.startingX === undefined) parent.startingX = startingX;
      if (parent.startingY === undefined) parent.startingY = startingY;

      if (parent.x === undefined) parent.x = parent.startingX;
      if (parent.y === undefined) parent.y = parent.startingY;

      // if the parent didn't setup this object, set it to its defaults
      if (value.showKey === undefined) value.showKey = false;

      if (value.pixelsPerCharacter === undefined)
        value.pixelsPerCharacter = defaultPixelsPerCharacter;
      if (value.fontSize === undefined) value.fontSize = defaultFontSize;
      if (value.color === undefined) value.color = defaultColor;

      if (value.width === undefined) {
        if (value.showKey) {
          value.width = key.length * value.pixelsPerCharacter;
        } else {
          value.width = 0;
        }
      }

      if (value.height === undefined) value.height = 0; // defaultHeight;

      if (value.startingX === undefined) value.startingX = parent.x;
      if (value.startingY === undefined) value.startingY = parent.y;

      if (value.x === undefined) value.x = value.startingX + value.width;
      if (value.y === undefined) value.y = value.startingY;

      // DISCOURSE UNIT
      if (key === "DiscourseUnit") {
        value.width = 0; //key.length * value.pixelsPerCharacter;
        value.height = value.height;
        value.x = startingX + value.width;
        value.y = startingY + 40;

        BR_discourseName(value);
        BR_fragments(value, parent);
      }

      // FRAGMENTS
      if (parent.fragments != null) {
        // this is a fragment, print the key to the screen
        value.showKey = true;
        value.width = key.length * value.pixelsPerCharacter;
        value.x = value.startingX + value.width;
        value.type = "FragmentChild";
        printText(key, value);

        BR_conjunction(value);

        // loop through all this fragment's children
        Object.entries(value).forEach(([childKey, childValue]) => {
          processJsonElement(value, childKey, childValue, parent);
        });
      }

      if (parent.type && parent.type === "FragmentChild") {
        // printText(key, value)
        // loop through all this fragment's children
        if (typeof value === "object") {
          Object.entries(value).forEach(([childKey, childValue]) => {
            processJsonElement(value, childKey, childValue, parent);
          });
        }
      }

      if (key === "Clause") {
        console.log("clause");
      }

      if (key === 'Conjunction'){
        console.log("conjunction")
      }

      // T2
      if (key === "t2") {
        value.color = "Red";
        value.fontSize = 30;
        value.pixelsPerCharacter = 15;
        value.width = key.length * value.pixelsPerCharacter;
        value.x = value.x + value.width;
        value.showKey = true;

        // if this obj has t3 and t4 then show the t3
        if (hasEvery(value, ["t3", "t4"])) {
          Object.entries(value).forEach(([childKey, childValue]) => {
            if (
              childKey === "t3" &&
              childValue != null &&
              typeof childValue === "object"
            ) {
              (childValue as any).color = "Green";
              (childValue as any).showKey = true;
            }
          });
        }
      }
    } catch {
      // console.error(e)
    }
  };

  function printText(key: string, value: any) {
    counter++;

    const svgElement = (
      // <rect
      //   key={`${x}-${y}-${counter}`}
      //   width="10"
      //   height="10"
      //   x={canvasWidth - (x + counter * 12)}
      //   y={y}
      //   fill="blue"
      // />

      <text
        key={`key-${counter}`}
        x={canvasWidth - value.x}
        y={value.y}
        textLength={value.width}
        fontSize={value.fontSize}
        fill={value.color}
      >
        {value.showKey && key}
      </text>
    );

    setSvgElements((prevSvgElements) => [...prevSvgElements, svgElement]);
  }

  function BR_fragments(value: any, parent: any) {
    // iterate through all items in the fragments array
    if (value.fragments && typeof value.fragments === "object") {
      Object.entries(value.fragments).forEach(([childKey, childValue]) => {
        processJsonElement(value, childKey, childValue, parent);
      });
    }
  }

  function BR_conjunction(value: any) {
    if (
      value[0].Clause != null &&
      value[1].Conjunction != null &&
      value[2].Clause != null
    ) {
      // set children's starting positions
      value[0].Clause.startingY = value.y;
      value[1].Conjunction.startingY = value.y + 40;
      value[2].Clause.startingY = value.y + 80;

      // show keys
      value[0].Clause.showKey = true;
      value[1].Conjunction.showKey = true;
      value[2].Clause.showKey = true;
    }
  }

  function BR_discourseName(value: any) {
    if (hasEvery(value, ["name"]) && value.name != null) {
      const svgElement = (
        <text
          key={`key-${counter}`}
          x={
            canvasWidth -
            startingX -
            value.name.length * value.pixelsPerCharacter
          }
          y={startingY}
          textLength={value.name.length * value.pixelsPerCharacter}
          fontSize={value.fontSize}
          fill={value.color}
        >
          {value.name}
        </text>
      );

      setSvgElements((prevSvgElements) => [...prevSvgElements, svgElement]);
    }
  }

  const hasEvery = (obj: any, keys: string[]): boolean => {
    if (typeof obj === "object") {
      return keys.every((key) => key in obj);
    }
    return false;
  };

  const iterateJsonObjectOneLevel = (obj: any) => {
    if (obj) {
      Object.entries(obj).forEach(([key, value], index) => {
        if (typeof value === "object" && value !== null) {
          (value as any).id = counter;
          processJsonElement(obj, key, value);
          // iterateJsonObject(value); // Recursively iterate nested objects
        }
      });
    }
  };

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollLeft = scrollableRef.current.scrollWidth;
    }
  });

  useEffect(() => {
    setSvgElements([]);
    iterateJsonObjectOneLevel(jsonData);
  }, [jsonData]);

  return (
    <div className="svg-container" ref={scrollableRef}>
      {/* {result && JSON.stringify(result)} */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={canvasWidth}
        height={canvasHeight}
      >
        {svgElements}
      </svg>
    </div>
  );
};

export default SvgDiagram;
