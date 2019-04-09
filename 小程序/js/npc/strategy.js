const ENERMY_HEIGHT = 50;
export default class Stratege {
  constructor() {
    let s1 = {
      height: 3,
      s: [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]
    }
    let s2 = {
      height: 3,
      s: [{ x: 3, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 3, y: 2 }],
      distance:6,
      min:2,
      max:5
    }

    this.st = [];
    this.st.push(s1);
    this.st.push(s2);
  }

}
