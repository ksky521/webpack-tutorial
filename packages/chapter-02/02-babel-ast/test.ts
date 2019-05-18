interface Node {
  type: string;
  start: number;
  end: number;
  loc: {
    start: {
      line: number;
      column: number;
    },
    end: {
      line: number;
      column: number;
    }
  }
}