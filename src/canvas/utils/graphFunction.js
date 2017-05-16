export default function (ctx, graph, fn) {
    let xMin = graph.axis.x.min,
        xMax = graph.axis.x.max,
        yMin = graph.axis.y.min,
        yMax = graph.axis.y.max;

    let [xMinG, xMaxG] = shiftToGraphCoords(ctx, xMin, xMax);
    let [yMinG, yMaxG] = shiftToGraphCoords(ctx, yMin, yMax);

    let [r, g, b] = toColor(graph.color || 'black');

    for (let x = -(ctx.canvas.width / 2); x < ctx.canvas.width / 2; x++) {
        let [graphX] = shiftFromGraphCoords(ctx, x, 1),
            graphY = yMax - fn(graphX) + ((xMin + xMax) / 2),
            [, y] = shiftToGraphCoords(ctx, 1, graphY);
        ctx.fillStyle = fn.color || 'black';
        ctx.fillRect(Math.floor(ctx.canvas.width / 2) + x,
            Math.floor(Math.abs((yMin + yMax) / 2) + y), 2, 2);
    }
}

function drawPointGraph(ctx, graph, x, y, r = 0, g = 0, b = 0, a = 255) {
    let xMin = graph.axis.x.min,
        xMax = graph.axis.x.max,
        yMin = graph.axis.y.min,
        yMax = graph.axis.y.max,
        centerX = Math.floor(ctx.canvas.width / 2),
        centerY = Math.floor(ctx.canvas.height / 2);
    //
}

function shiftToGraphCoords(ctx, x, y) {
    let scaleX = ctx.canvas.width / (graph.axis.x.max - graph.axis.x.min),
        scaleY = ctx.canvas.height / (graph.axis.y.max - graph.axis.y.min);
    return [x * scaleX, y * scaleY];
}

function shiftFromGraphCoords(ctx, x, y) {
    let scaleX = ctx.canvas.width / (graph.axis.x.max - graph.axis.x.min),
        scaleY = ctx.canvas.height / (graph.axis.y.max - graph.axis.y.min);
    return [x / scaleX, y / scaleY];
}

function drawPoint(ctx, x, y, r = 0, g = 0, b = 0, a = 255) {
    x = Math.floor(x), y = Math.floor(y);
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
    ctx.fillRect(x, y, 1, 1);
}

function toColor(color) {
    let d = document.createElement("div");
    d.style.color = color || black;
    document.body.appendChild(d)
    //Color in RGB 
    let [r, g, b] = window.getComputedStyle(d).color.split('(')[1].slice(0, -1).split(', ');
    document.body.removeChild(d);
    return [r, g, b];
}