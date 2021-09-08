export interface GraphNode {
  name: string;
  id: string;
  groupIndex: number;
  fx?: number;
  x?: number;
  vx?: number;
  fy?: number;
  y?: number;
  vy?: number;
  fz?: number;
  z?: number;
  vz?: number;
  children?: GraphNode[];
}