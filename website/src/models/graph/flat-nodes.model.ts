import { GraphNodeLink } from './graph-node-link';
import { GraphNode } from './graph-node.model';

export interface FlatNodes<T> {
  nodes: GraphNode<T>[];
  links: GraphNodeLink[];
}