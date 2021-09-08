import { AfterViewInit, Component, ElementRef, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import ForceGraph3D from '3d-force-graph';
import { GraphNode } from '../../models/graph/graph-node.model';
import { GraphNodeLink } from '../../models/graph/graph-node-link';
import { SkillTree } from './models/skill-tree.model';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import * as d3 from 'd3';
import { BufferAttribute, BufferGeometry, Euler, Line, LineBasicMaterial } from 'three';
import { DOCUMENT } from '@angular/common';
import { FlatNodes } from '../../models/graph/flat-nodes.model';

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SkillsComponent implements AfterViewInit {
  //#region Properties
  @ViewChild('graph')
  public graph: ElementRef;
  //#endregion

  //#region Ctor
  public constructor(@Inject(DOCUMENT) private readonly _document: Document) {

  }
  //#endregion

  //#region Public Methods
  public ngAfterViewInit(): void {
    const skills: SkillTree = {
      id: 'me',
      name: 'My personal skills',
      vx: 0,
      vy: 0,
      vz: 0,
      children: [{
        id: 'methods',
        name: 'Methods',
        vx: 50,
        vz: 0,
        collapsed: false,
        children: [{
          id: 'scrum',
          name: 'Scrum'
        }, {
          id: 'kanban',
          name: 'Kanban'
        }]
      }, {
        id: 'backend',
        name: 'Backend Development',
        vx: 50,
        vy: 50,
        vz: 0,
        collapsed: false,
        children: [{
          id: 'asp',
          name: 'ASP.NET MVC'
        }, {
          id: 'asp-rest',
          name: 'ASP.NET REST'
        }, {
          id: 'express',
          name: 'express.js REST Apis'
        }, {
          id: 'node-backends',
          name: 'Node.js Backends & CLIs'
        }]
      }, {
        id: 'devops',
        name: 'Infrastructure / DevOps',
        vx: 50,
        vz: 0,
        collapsed: false,
        children: [{
          id: 'os',
          name: 'Operating Systems',
          children: [{
            id: 'mac',
            name: 'Mac OS'
          }, {
            id: 'windows',
            name: 'Windows'
          }, {
            id: 'linux',
            name: 'Linux (Debian, Ubuntu, SuSE, etc.)'
          }]
        }, {
          id: 'docker',
          name: 'Docker & Docker Compose'
        }, {
          id: 'aws',
          name: 'Amazon Web Services (AWS)',
          children: [{
            id: 's3',
            name: 'S3'
          }, {
            id: 'apigw',
            name: 'ApiGateway'
          }, {
            id: 'cloudwatch',
            name: 'CloudWatch'
          }, {
            id: 'lambda',
            name: 'Lambda'
          }, {
            id: 'dynamodb',
            name: 'Dynamodb'
          }]
        }]
      }, {
        id: 'general',
        name: 'General',
        vz: 0,
        collapsed: false,
        children: [{
          id: 'architecture',
          name: 'Software Architecture'
        }, {
          id: 'programming-languages',
          name: 'Programming & Script languages',
          children: [{
            id: 'csharp',
            name: 'C#'
          }, {
            id: 'js',
            name: 'JavaScript'
          }, {
            id: 'java',
            name: 'Java'
          }, {
            id: 'ts',
            name: 'TypeScript'
          }, {
            id: 'cpp',
            name: 'C++'
          }, {
            id: 'php',
            name: 'PHP'
          }]
        }, {
          id: 'frameworks',
          name: 'Frameworks and Libraries',
          children: [{
            id: 'dotnetcore',
            name: 'DotNet Core'
          }, {
            id: 'dotnet',
            name: '.NET'
          }, {
            id: 'mono',
            name: 'Mono C#'
          }, {
            id: 'node',
            name: 'NodeJs'
          }]
        }]
      }, {
        id: 'frontend',
        name: 'Frontend Development',
        vx: 50,
        vz: 0,
        vy: 50,
        collapsed: false,
        children: [{
          id: 'mobile',
          name: 'Mobile Development',
          children: [{
            id: 'android',
            name: 'Android App Development'
          }, {
            id: 'ios-hybrid',
            name: 'Hybrid iOS App Development with Apache Cordova'
          }, {
            id: 'ios-android',
            name: 'Hybrid Android App Development with Apache Cordova'
          }]
        }, {
          id: 'desktop',
          name: 'Desktop Development',
          children: [{
            id: 'winforms',
            name: 'Native Windows - Windows Forms'
          }, {
            id: 'wpf',
            name: 'Native Windows - WPF & C#'
          }, {
            id: 'gambas',
            name: 'Native Linux - Gambas & Visual Basic'
          }, {
            id: 'desktop-hybrid',
            name: 'Hybrid Desktop Clients with Electron'
          }]
        }, {
          id: 'web',
          name: 'Web Development',
          children: [{
            id: 'ng',
            name: 'Angular & angular.js'
          }, {
            id: 'vue',
            name: 'VueJS'
          }, {
            id: 'wordpress',
            name: 'Wordpress'
          }, {
            id: 'joomla',
            name: 'Joomla'
          }]
        }]
      }]
    };

    let nodes: GraphNode<SkillTree>[] = [];
    let links: GraphNodeLink[] = [];
    this.parseSkillTree(skills, 1, nodes, links);

    const myGraph = ForceGraph3D({
      extraRenderers: [new CSS2DRenderer() as any]
    });

    const groupColors: string[]= [
      '#1d948f',
      '#1d941d',
      '#32ec32',
      '#ccc',
    ];
    const nodeColorScale = d3.scaleOrdinal(d3.schemeRdYlGn[4])
    const graph = myGraph(this.graph.nativeElement);
    let focusedNode: any = null;

    graph
      //.linkColor(({targetGroupIndex}: any) => groupColors[targetGroupIndex % groupColors.length])
      .nodeColor(node => nodeColorScale(node.id as string))
        .linkThreeObject((link: any) => {
          // 2 (nodes) x 3 (r+g+b) bytes between [0, 1]
          // For example:
          // new Float32Array([
          //   1, 0, 0,  // source node: red
          //   0, 1, 0   // target node: green
          // ]);
          const colors = new Float32Array([].concat(
            ...[link.sourceGroupIndex, link.targetGroupIndex]
              .map((groupIndex) => groupColors[groupIndex % groupColors.length])
              .map(x => d3.color(x).rgb())
              .map(({r, g, b}) =>  [r, g, b].map(v => v / 255)
            )));

          const material = new LineBasicMaterial({ vertexColors: true });
          const geometry = new BufferGeometry();
          geometry.setAttribute('position', new BufferAttribute(new Float32Array(2 * 3), 3));
          geometry.setAttribute('color', new BufferAttribute(colors, 3));
          const line = new Line(geometry, material);
          return line;
        })

        .onNodeHover((node: any) => this.graph.nativeElement.style.cursor = node && node.children.length ? 'pointer' : null)
        .onNodeClick((node: any) => {
          focusedNode = node;
          this.focusNode(node, graph);
        })
        .linkPositionUpdate((object3d, { start, end }) => {
          const line = object3d as Line;
          const startR = myGraph.nodeRelSize();
          const endR = myGraph.nodeRelSize();
          const lineLen = Math.sqrt(['x', 'y', 'z']
            .map((dim) => Math.pow(((end as any)[dim] || 0) - ((start as any)[dim] || 0), 2))
            .reduce((acc, v) => acc + v, 0));

          const linePos = line.geometry.getAttribute('position') as BufferAttribute;

          // calculate coordinate on the node's surface instead of center
          const positions = [
            startR / lineLen,
            1 - endR / lineLen
          ].map(t => [
              'x',
              'y',
              'z'
            ].map(dim => (start as any)[dim] + ((end as any)[dim] - (start as any)[dim]) * t));

          const positionsFlat: number[] = [];
          for(const position of positions) {
            positionsFlat.push(...position)
          }
          linePos.set(positionsFlat);
          linePos.needsUpdate = true;
          return true;
        })
      .backgroundColor('rgba(0,0,0,0)')
      .linkOpacity(0.9)
      .linkWidth(() => 4)
      //.backgroundColor('rgba(0,0,0,0)')
      .nodeThreeObject((node: any) => {
        const nodeEl = document.createElement('div');
        nodeEl.textContent = `${node.name}`;
        nodeEl.className = 'skills__node-label';
        const _2dElement = new CSS2DObject(nodeEl);
        node.element$ = nodeEl;
        node.spaceObject$ = _2dElement;
        return _2dElement;
      })
      .nodeThreeObjectExtend(true)
      .width((this.graph.nativeElement as HTMLElement).clientWidth)
      .height((this.graph.nativeElement as HTMLElement).clientHeight)
      .nodeColor(({groupIndex, id }: any) =>
        id === 'me'
          ? '#ff0000'
          : groupColors[groupIndex % groupColors.length])
      .cooldownTicks(100)
      .graphData({ nodes: nodes, links: links });

    myGraph
      .d3Force('link')
      .distance(() => 50)

    this._document.defaultView.setTimeout(() => {
      const node = nodes.find(x => x.id === 'me');
      focusedNode = node;
      this.focusNode(node, graph);
    }, 500);
    let rotation: Euler = null;
    this._document.defaultView.setInterval(() => {
      const cameraPosition = graph.cameraPosition();

      if (rotation && graph.rotation.equals(rotation)) {
        return;
      }

      rotation = graph.rotation;

      nodes.forEach((x: any) => {
        if (!x.element$) {
          return;
        }

        const distance = this.calculate3dDistance(cameraPosition, x);
        const defaultSize = 24;
        const minimumSize = 5;
        const currentSize = (x.element$ as HTMLElement).style.fontSize;
        const percentage = Math.min(1, (distance / 600));
        const targetSize = `${Math.max(minimumSize, Math.round((defaultSize - percentage * defaultSize) *10)/10)}px`;
        let focusBoost = 0;
        if (focusedNode && !this.isChildOf(focusedNode, x, links) && focusedNode.id !== x.id) {
          focusBoost = 0.3;
        }

        if(targetSize !== currentSize) {
          (x.element$ as HTMLElement).style.fontSize = targetSize;
          (x.element$ as HTMLElement).style.opacity = `${1 - 0.8 * percentage - focusBoost}`;
        }
      });
    }, 1000 / 30);
  }

  private isChildOf(parent: any, child: any, links: GraphNodeLink[]) {

    let currentChildId = child.id;
    let currentLink: GraphNodeLink = undefined;
    let isChild = false;
    do {
      currentLink = links.find(x => (x.target as any).id === currentChildId);
      if (currentLink) {
        currentChildId = currentLink.source;
      }

      if (currentLink && currentLink.source === parent.id) {
        isChild = true;
        break;
      }
    } while (currentLink)
    return isChild;

  }

  private focusNode(node: GraphNode<SkillTree>, graph: any) {
    const maxDistance = node.children
      .map(child => this.calculate3dDistance(node, child))
      .reduce((prev, cur) => Math.max(prev, cur), 0);
    const distance = (maxDistance + 20) * 2;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    graph.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
      node as any,
      3000
    );
  }

  private calculate3dDistance(x: any, y: any) {
    const { x: x1, y: y1, z: z1 } = x
    const { x: x2, y: y2, z: z2 } = y;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    return distance;
  }

  //#endregion

  //#region PRivate Methods
  private parseSkillTree(skillTree: SkillTree, groupIndex: number, nodes: GraphNode<SkillTree>[], links: GraphNodeLink[]): GraphNode<SkillTree> {
    const { id, name, children, fx, fy, fz, vx, vy, vz, x, y, z, collapsed } = skillTree;

    const node: GraphNode<SkillTree> = {
      id,
      name,
      fx,
      fy,
      fz,
      vx,
      x,
      vy,
      y,
      vz,
      z,
      data: skillTree,
      groupIndex
    };

    nodes.push(node);


    node.children = collapsed
      ? []
      : (children || [])
      .map(child => {
        const { id: target } = child;

        links.push({
          sourceGroupIndex: groupIndex,
          source: id,
          target,
          targetGroupIndex: groupIndex + 1
        });

        return this.parseSkillTree(child, groupIndex + 1, nodes, links);
      })
      .filter(x => x);


    return node;
  }
  //#endregion
}


