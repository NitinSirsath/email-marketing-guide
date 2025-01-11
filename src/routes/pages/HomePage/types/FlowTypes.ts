export interface FlowchartNode {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
}

export interface FlowchartEdge {
  id: string;
  source: string;
  target: string;
}
