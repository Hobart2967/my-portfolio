import { GraphNodeLink } from './graph-node-link';
import { GraphNode } from './graph-node.model';

export interface FlatNodes {
  nodes: GraphNode[];
  links: GraphNodeLink[];
}