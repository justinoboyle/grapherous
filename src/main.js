import $ from 'jquery';
import hljs from 'highlight.js';
import canvasDrawer from './canvas/drawCanvas';

window.store = {};

window.graph = {};

window.$ = $;


$(document).ready(() => {
    if (localStorage.lastCode)
        window.store.editor.setValue(localStorage.lastCode);
    let down = false;
    window.mouseX = window.innerWidth / 2; window.mouseY = window.innerHeight;
    // $('.grabby').mousedown(() => down = true);
    // $(document.body).mouseup(() => down = false);
    // $(document.body).mousemove(e => {
    //     window.mouseX = e.pageX; window.mouseY = e.pageY;
    //     if (down) {
    //         $('#hotstyle').html(`.left { min-width: ${e.pageX}px; }`);
    //         window.store.editor.resize();
    //         drawCanvas();
    //     }
    // });
    
    window.store.editorContent = window.store.editor.getValue();
    try {
        let fn = v => {
            window.graph = 
                eval(`(function() { 
                        try {
                            let graph = {}; 
                            let __toShow = [];
                            let overlay = a => __toShow.push(a);
                            let setInterval = undefined; 
                            ${v} ;\n\n\n window.store.error = undefined; if(__toShow.length > 0) window.store.error = __toShow.join(''); return graph; 
                        }catch(e) {
                            window.store.error = e;
                            return {};
                        }
                    })()`);
                drawCanvas();
        };
       setTimeout(() => fn(window.store.editorContent), 1);
       window.fn = fn;
       window.store.editor.getSession().on('change', e => setTimeout(() => {
           window.store.editorContent = window.store.editor.getValue();
           localStorage.lastCode = window.store.editorContent;
           fn(window.store.editorContent);
       }, 1));
    } catch (e) { }
});

function drawCanvas() {
    try {
        if(window.store.error) {
            let displayLocationBottom = window.graph.overlayBottom || false;
            $('overlaydump').html(`<div class="overlay ${displayLocationBottom ? 'overlay-bottom' : 'overlay-top'}"><pre id="overlayContent"></pre></div>`);
            $('#overlayContent').text(window.store.error);
        } 
        else $('overlaydump').html('');
        window.canvas = $('canvas')[0];
        canvas.width = window.mouseX;
        canvas.height = window.innerHeight;
        window.ctx = window.canvas.getContext('2d');
        canvasDrawer(window.ctx, window.graph);
        global.ctx = ctx;
    }catch(e) {
    }
}


function multiLineHtmlEncode(value) {
    var lines = value.split(/\r\n|\r|\n/);
    for (var i = 0; i < lines.length; i++) {
        lines[i] = htmlEncode(lines[i]);
    }
    return lines.join('\r\n');
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
} 