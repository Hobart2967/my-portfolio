import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import ForceGraph3D from '3d-force-graph';
import { GraphNode } from '../../models/graph/graph-node.model';
import { GraphNodeLink } from '../../models/graph/graph-node-link';
import { SkillTree } from './models/skill-tree.model';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import * as d3 from 'd3';
import { BufferAttribute, BufferGeometry, Euler, Line, LineBasicMaterial } from 'three';

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

  //#region Public Methods
  public ngAfterViewInit(): void {
    const skills: SkillTree = {
      id: 'me',
      name: 'Me',
      vx: 0,
      vy: 0,
      vz: 50,
      children: [{
        id: 'methods',
        name: 'Methods',
        vx: 50,
        vz: -50,
      }, {
        id: 'backend',
        name: 'Backend Development',
        vx: 50,
        vy: 50,
        vz: -50,
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
        vz: -50,
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
        children: [{
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
        vz: -50,
        vy: 50,
        children: [{
          id: 'native-desktop',
          name: 'Native Desktop Development',
          children: [{
            id: 'winforms',
            name: 'Native Windows - Windows Forms'
          }, {
            id: 'wpf',
            name: 'Native Windows - WPF & C#'
          }, {
            id: 'gambas',
            name: 'Native Linux - Gambas & Visual Basic'
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
          }]
        }]
      }]
    };

    const nodes: GraphNode[] = [];
    const links: GraphNodeLink[] = [];
    this.parseSkillTree(skills, 1, nodes, links);
    const myGraph = ForceGraph3D({
      extraRenderers: [new CSS2DRenderer() as any]
    });

    const groupColors: string[]= [
      '#1d941d',
      '#ccc',
      '#1d948f'
    ];
    const nodeColorScale = d3.scaleOrdinal(d3.schemeRdYlGn[4])
    const graph = myGraph(this.graph.nativeElement);
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

          const material = new LineBasicMaterial({ vertexColors: true, linewidth: 30 });
          const geometry = new BufferGeometry();
          geometry.setAttribute('position', new BufferAttribute(new Float32Array(2 * 3), 3));
          geometry.setAttribute('color', new BufferAttribute(colors, 3));
          const line = new Line(geometry, material);
          return line;
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
        node.spaceOpject$ = _2dElement;
        return _2dElement;
      })
      .nodeThreeObjectExtend(true)
      .nodeColor(({groupIndex}: any) => groupColors[groupIndex % groupColors.length])
      .zoomToFit()
      .graphData({ nodes, links });

    myGraph
      .d3Force('link')
      .distance(() => 100)

    let rotation: Euler = null;
    setInterval(() => {
      const { x: x1, y: y1, z: z1 } = graph.cameraPosition();

      if (rotation && graph.rotation.equals(rotation)) {
        return;
      }

      rotation = graph.rotation;

      nodes.forEach((x: any) => {
        if (x.id === 'me') {
          return;
        }

        if (!x.element$) {
          return;
        }

        const { x: x2, y: y2, z: z2 } = x;
        const distance = (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2))/2;
        const defaultSize = 38;
        const minimumSize = 10;
        const currentSize = (x.element$ as HTMLElement).style.fontSize;
        const percentage = (distance / 136329);
        const targetSize = `${Math.max(minimumSize, Math.round((defaultSize - percentage * defaultSize) *10)/10)}px`;
        if(targetSize !== currentSize) {
          (x.element$ as HTMLElement).style.fontSize = targetSize;
          (x.element$ as HTMLElement).style.opacity = `${1 - 0.3 * percentage}`;
        }
      });
    }, 1000 / 30)
  }
  //#endregion

  //#region PRivate Methods
  private parseSkillTree(skillTree: SkillTree, groupIndex: number, nodes: GraphNode[], links: GraphNodeLink[]): GraphNode {
    const { id, name, children, fx, fy, fz, vx, vy, vz, x, y, z } = skillTree;
    const node: GraphNode = {
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
      groupIndex
    };
    nodes.push(node);

    node.children = (children || []).map(child => {
      const { id: target } = child;
      links.push({
        sourceGroupIndex: groupIndex,
        source: id,
        target,
        targetGroupIndex: groupIndex + 1
      });

      return this.parseSkillTree(child, groupIndex + 1, nodes, links);
    });

    return node;
  }
  //#endregion
}


