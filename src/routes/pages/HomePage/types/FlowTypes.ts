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
interface NodePosition {
  x: number;
  y: number;
}

interface Node {
  id: string;
  data: string;
  position: NodePosition;
}
export interface Sequence {
  id: string; // Alias for _id
  _id: string;
  email: string;
  scheduleTime: string;
  nodes: Node[];
  createdAt: string;
  updatedAt: string;
  emailTemplate: string; // Ensure emailTemplate is not optional here
}

export interface NewSequence {
  email: string;
  scheduleTime: string;
  nodes: Node[];
  emailTemplate: string;
}

export interface SequenceCardProps {
  sequence: Sequence;
  onEdit: (sequence: Sequence) => void;
  onDelete: (sequence: Sequence) => void;
}
