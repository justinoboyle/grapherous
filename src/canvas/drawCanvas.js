import drawAxis from './utils/drawAxis';
import graphFunction from './utils/graphFunction';

let avoid = ['axis', 'ticks', 'display', 'overlayBottom', '__proto__'];

export default function (ctx, graph) {
    drawAxis(ctx, graph);
    for (let id in graph) {
        if (avoid.indexOf(id) > -1)
            continue;
        let val = graph[id];
        graphFunction(ctx, graph, val);
    }
}