import React, { useState, useEffect, useRef } from "react";
import * as jsonpath from "jsonpath";
import { SvgBox, SvgElement } from "../common/types";

interface SvgDiagramProps {
  jsonData: any;
}

const SvgDiagram: React.FC<SvgDiagramProps> = ({ jsonData }) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [svgFile, setSvgFile] = useState<string>("");

  const [svgWidth, setSvgWidth] = useState("20000px")
  const [svgHeight, setSvgHeight] = useState("10000px")

  function convertJsonToSvgElements(json: any): SvgElement {
    function createSvgElement(
      key: string,
      value: any,
      parentBox: SvgBox
    ): SvgElement {
      const textLength = key.length * 10; // Adjust the multiplier as needed
      const box: SvgBox = {
        x: parentBox.x,
        y: parentBox.y,
        width: textLength,
        height: 20, // Adjust the height as needed
      };

      const children: SvgElement[] = [];
      if (typeof value === "object" && value !== null) {
        let childX = box.x + box.width;
        let childY = box.y;
        for (const childKey in value) {
          if (value.hasOwnProperty(childKey)) {
            const childElement = createSvgElement(childKey, value[childKey], {
              x: childX,
              y: childY,
              width: 0,
              height: 0,
            });
            children.push(childElement);
            childY += childElement.box.height;
          }
        }
      }

      const svgElement = new SvgElement(key, box, children, {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      });
      svgElement.update();
      return svgElement;
    }

    const rootKey = Object.keys(json)[0];
    const rootValue = json[rootKey];
    const rootBox: SvgBox = { x: 0, y: 0, width: 0, height: 0 };
    return createSvgElement(rootKey, rootValue, rootBox);
  }

  function calculateTotalDimensions(element: SvgElement): {
    width: number;
    height: number;
  } {
    let maxWidth = element.box.width;
    let maxHeight = element.box.height;

    function traverseChildren(child: SvgElement) {
      const childWidth = child.box.x + child.box.width;
      const childHeight = child.box.y + child.box.height;

      maxWidth = Math.max(maxWidth, childWidth);
      maxHeight = Math.max(maxHeight, childHeight);

      child.children.forEach(traverseChildren);
    }

    element.children.forEach(traverseChildren);

    // currently a bug, so I'm manually setting w/h
    return { width: maxWidth, height: maxHeight };
  }

  function createSvgFile(element: SvgElement): string {
    const { width, height } = calculateTotalDimensions(element);
    const svgContent = generateSvgContent(element);
    const svgFile = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">${svgContent}</svg>`;
    return svgFile;
  }

  function generateSvgContent(element: SvgElement): string {
    const { type, box, children } = element;
    const { x, y, width, height } = box;

    const textX = x + width / 2;
    const textY = y + height / 2;

    const svgText = `<text x="${textX}" y="${textY}" color="white" text-anchor="middle" dominant-baseline="central">${type}</text>`;

    const childrenContent = children.map(generateSvgContent).join("");

    const groupContent = `<g transform="translate(${x}, ${y})">${svgText}${childrenContent}</g>`;

    return groupContent;
  }

  useEffect(() => {
    if (scrollableRef.current) {
      // to make this start at the right side of the svg scroll area:
      // scrollableRef.current.scrollLeft = scrollableRef.current.scrollWidth;
    }
  });

  useEffect(() => {
    try {
      setSvgFile(createSvgFile(convertJsonToSvgElements(jsonData)));
    } catch {}
  }, [jsonData]);

  return (
    <div
      className="svg-container"
      ref={scrollableRef}
      dangerouslySetInnerHTML={{ __html: svgFile }}
      style={{
        width: "10000px",
        height: "10000px",
        overflow: "scroll"
      }}
    />
  );
};

export default SvgDiagram;
