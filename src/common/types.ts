export type SvgBox = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export class SvgElement {
  constructor(
    public type: string,
    public box: SvgBox,
    public children: SvgElement[],
    public childBox: SvgBox,
  ){}

  update2() {
    if (this.children.length === 0) {
      // If there are no children, set childBox to default values
      this.childBox = { x: 0, y: 0, width: 0, height: 0 };
    } else {
      // Initialize childBox with the box of the first child
      this.childBox = { ...this.children[0].box };
  
      // Iterate over the remaining children
      for (let i = 1; i < this.children.length; i++) {
        const childBox = this.children[i].box;
  
        // Update the x-coordinate of childBox
        this.childBox.x = Math.min(this.childBox.x, childBox.x);
  
        // Update the y-coordinate of childBox
        this.childBox.y = Math.min(this.childBox.y, childBox.y);
  
        // Update the width of childBox
        const rightEdge = Math.max(
          this.childBox.x + this.childBox.width,
          childBox.x + childBox.width
        );
        this.childBox.width = rightEdge - this.childBox.x;
  
        // Update the height of childBox
        const bottomEdge = Math.max(
          this.childBox.y + this.childBox.height,
          childBox.y + childBox.height
        );
        this.childBox.height = bottomEdge - this.childBox.y;
      }
    }
  }

  update() {
    if (this.children.length === 0) {
      // If there are no children, set childBox to default values
      this.childBox = {
        x: this.box.x + this.box.width,
        y: this.box.y + this.box.height,
        width: 0,
        height: 0,
      };
    } else {
      // Initialize childBox with the box of the first child
      const firstChild = this.children[0];
      this.childBox = {
        x: this.box.x + this.box.width,
        y: this.box.y + this.box.height,
        width: firstChild.box.width,
        height: firstChild.box.height,
      };
  
      // Iterate over the remaining children
      for (let i = 1; i < this.children.length; i++) {
        const childBox = this.children[i].box;
  
        // Update the x-coordinate of childBox
        this.childBox.x = Math.min(this.childBox.x, childBox.x);
  
        // Update the y-coordinate of childBox
        this.childBox.y = Math.min(this.childBox.y, childBox.y);
  
        // Update the width of childBox
        const rightEdge = Math.max(
          this.childBox.x + this.childBox.width,
          childBox.x + childBox.width
        );
        this.childBox.width = rightEdge - this.childBox.x;
  
        // Update the height of childBox
        const bottomEdge = Math.max(
          this.childBox.y + this.childBox.height,
          childBox.y + childBox.height
        );
        this.childBox.height = bottomEdge - this.childBox.y;
      }
    }
  }
}
