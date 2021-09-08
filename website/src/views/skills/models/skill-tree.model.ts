export interface SkillTree {
  id: string;
  name: string;
  children?: SkillTree[];
  fx?: number;
  x?: number;
  vx?: number;
  fy?: number;
  y?: number;
  vy?: number;
  fz?: number;
  z?: number;
  vz?: number;
}