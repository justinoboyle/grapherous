export default function (ctx, graph) {
    let display = graph.display || { ticks: {} };
    let ticks = graph.display.ticks || {};
    let centerX = Math.floor(ctx.canvas.width / 2), centerY = Math.floor(ctx.canvas.height / 2);
    drawPoint(ctx, centerX, centerY, 0, 0, 0, 255, 5);
    ctx.fillRect(0, centerY, ctx.canvas.width, 1);
    ctx.fillRect(centerX, 0, 1, ctx.canvas.height);

    // ticks not implemented yet

    // for (let x = 0; x < ctx.canvas.width; x++)
    //     if (x % (ticks.every || 10) == 0)
    //         ctx.fillRect(x, centerY - (ticks.height || 10), 1, (ticks.height || 10) * 2);

    // for (let y = 0; y < ctx.canvas.height; y++)
    //     if (y % (ticks.every || 10) == 0)
    //         ctx.fillRect(centerX - (ticks.height || 10), y, (ticks.height || 10) * 2, 1);
}

function drawPoint(ctx, x, y, r = 0, g = 0, b = 0, a = 255) {
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
    ctx.fillRect(x, y, 1, 1);
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