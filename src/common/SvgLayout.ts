export type SvgElement = {
  type: "t1" | "t2" | "t3";
  width: number;
  height: number;
  x: number;
  y: number;
};

export class SvgLayout {
  elements: SvgElement[] = [];

  addElement = (el: SvgElement): void => {
    this.elements.push(el);
  };
}
