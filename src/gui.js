function loadFont(url) {
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode(`
    @import url('${url}');
    .hidden{
        display: none;
    }
    `));
    document.head.appendChild(newStyle);
}

loadFont('https://fonts.googleapis.com/css?family=Baloo+Bhai|Stylish|Ubuntu|Pacifico&display=swap');

class GUI {

    constructor(title, w, h) {
        this.title = title;
        this.w = w;
        this.h = h;
        this.frame = this.createFrame(this.w, this.h);
        this.header = this.createHeader(this.title, 20, "#f8303c");
        this.addTo(this.frame, this.header);
        this.addTo(document.body, this.frame);
        dragElement(this.frame);
        this.prepareCSS();
    }

    prepareCSS() {
        let slStyle =this.create('style');
        let srStryle = document.createTextNode(`
        input[type="range"] {
    width: 100%;
    height: 10px; /* thumbHeight + (2 x thumbBorderWidth)*/
    -webkit-appearance: none; /*remove the line*/
    outline: none;
    margin: 5px;
    background-color:transparent;
    border: 0; /*for firefox on android*/
    
}

/*chrome and opera*/
input[type="range"]::-webkit-slider-runnable-track {
    background: transparent; /*trackColor*/
    height: 10px; /*trackHeight*/
    border-radius: 0; /*trackHeight*/
    transition: 0.3s;
}

input[type="range"]:hover::-webkit-slider-runnable-track,
input[type="range"]:focus::-webkit-slider-runnable-track {
    background: transparent; /*activeTrackColor*/
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: red; /*thumbColor*/
    width: 10px; /* thumbHeight + (2 x thumbBorderWidth)*/
    height: 10px; /* thumbHeight + (2 x thumbBorderWidth)*/
    border-radius: 50%;
    /*margin-top: -12px; /* -[thumbHeight + (2 x thumbBorderWidth) - trackHeight]/2*/
    cursor: pointer;
    border: 0; /*border-width should be equal to thumbBorderWidth if you want same border width across all browsers and border-color should match the background*/
    transition: 0.3s;
}

input[type="range"]:hover::-webkit-slider-thumb,
input[type="range"]:focus::-webkit-slider-thumb {
    background: linear-gradient(to right, rgba(125, 225, 125, 0.9), rgba(125, 225, 125, 0.1)); /*activeThumbColor*/
}

/*firefox*/
input[type="range"]::-moz-focus-outer {
    border: 0;
}

input[type="range"]::-moz-range-track {
    background: transparent; /*trackColor*/
    height: 10px; /*trackHeight*/
    border-radius: 10px; /*trackHeight*/
    /*background isn't animatable, so can't use transition*/
}

input[type="range"]:hover::-moz-range-track,
input[type="range"]:focus::-moz-range-track {
    background: transparent; /*activeTrackColor*/
}

input[type="range"]::-moz-range-thumb {
    background: red; /*thumbColor*/
    width: 10px; /*thumbHeight*/
    height: 10px; /*thumbHeight*/
    border-radius: 50%;
    cursor: pointer;
    /*border: 1px solid green; /*border-width = thumbBorderWidth, border-color should match the background*/
}

input[type="range"]:hover::-moz-range-thumb,
input[type="range"]:focus::-moz-range-thumb {
    background: linear-gradient(to right, rgba(20, 20, 255, 0.9), rgba(225, 25, 25, 0.1)); /*activeThumbColor*/
}

input[type="range"]::-moz-range-progress {
    background: linear-gradient(to right, rgba(125, 225, 125, 0.1), rgba(125, 225, 125, 0.9)); /*thumbColor*/
    border-radius: 4px; /*trackHeight*/
    height: 10px; /*trackHeight*/
}

input[type="range"]:hover::-moz-range-progress,
input[type="range"]:focus::-moz-range-progress {
    background: linear-gradient(to right, rgba(125, 225, 125, 0.1), rgba(125, 225, 225, 0.9)); /*activeThumbColor*/
}

/*edge and IE*/
input[type="range"]::-ms-track {
    background: transparent; /*trackColor*/
    height: 4px; /*trackHeight*/
    border-radius: 4px; /*trackHeight*/
    border: none;
    color: transparent;
}

input[type="range"]:hover::-ms-track,
input[type="range"]:focus::-ms-track {
    background: transparent; /*activeTrackColor*/
}

input[type="range"]::-ms-thumb {
    background: red; /*thumbColor*/
    width: 10px; /*thumbHeight*/
    height: 10px; /*thumbHeight*/
    border-radius: 50%;
    border: none;
    /*margin: 0 4px 0; 0 thumbBorderWidth 0*/
    box-shadow: 0 0 0 4px #fff; /*0 0 0 thumbBorderWidth #fff, box-shadow color should match the background*/
    /*cursor:pointer; doesn't work*/
}

input[type="range"]:hover::-ms-thumb,
input[type="range"]:focus::-ms-thumb {
    background: linear-gradient(to right, rgba(125, 225, 125, 0.9), rgba(125, 225, 125, 0.1)); /*activeThumbColor*/
}

input[type="range"]::-ms-tooltip {
    display: none; /*tooltip makes thumb sliding lagy*/
}

input[type="range"]::-ms-fill-lower {
    background: red; /*thumbColor*/
    border-radius: 4px; /*trackHeight*/
}

input[type="range"]:hover::-ms-fill-lower,
input[type="range"]:focus::-ms-fill-lower {
    background: linear-gradient(to right, rgba(125, 225, 125, 0.1), rgba(125, 225, 125, 0.9)); /*activeThumbColor*/
}
`);

        this.addTo(slStyle, srStryle);
        this.addTo(document.head, slStyle);
    }

    createControl(obj, prop, valueFrom, valueTo, steps) {
        let slider = this.create('input');
        slider.type = 'range';
        slider.id = prop + '';
        slider.min = valueFrom;
        let vv = obj[prop];
        slider.value = vv;
        slider.max = valueTo;
        slider.step = steps;
        let cC = this.create('div');
        cC.style.display = 'grid';
        cC.style.gridTemplateColumns = '25% 45% 25%';
        cC.style.gridColumnGap = '7px';
        cC.style.background = 'transparent';
        cC.style.marginBottom = '3px';
        cC.style.color = 'cadetblue';
        let v1 = this.create('a');
        v1.innerHTML = prop+'';
        v1.style.background = 'rgba(255, 255, 255, 0.2)';
        this.addTo(cC, v1);
        this.addTo(cC, slider);
        let v2 = this.create('a');
        v2.innerHTML = slider.value;
        v2.style.color = 'darkorange';
        v2.style.background = 'rgba(255, 255, 255, 0.2)';
        slider.addEventListener('mousemove', function(e){
           v2.innerHTML =  e.target.value;
           obj[prop] = parseFloat(e.target.value);
        });
        this.addTo(cC, v2);
        this.addTo(this.frame, cC);
    }

    createFrame(w, h) {
        let f = this.create('div');
        f.id = "nframe_";
        f.style.position = 'absolute';
        f.style.boxSizing = 'border-box';
        f.style.top = 100 + 'px';
        f.style.left = 1200 + 'px';
        f.style.width = w + "px";
        f.style.height = h + "px";
        f.style.background = 'rgba(0, 0, 0, 0.1)';
        f.style.zindex = 99999;
        f.style.textAlign = 'center';
        return f;
    }

    addTo(pObj, cObj) {
        pObj.appendChild(cObj);
    }

    createHeader(string, fontsize, color) {
        let header = this.create('div');
        header.id = "nframe_header";
        header.style.fontSize = fontsize + "px";
        header.innerHTML = string;
        header.style.color = color;//"#f8303c";
        header.style.background = "linear-gradient(to right, rgba(23, 59, 175, 0.6), rgba(61, 118, 28, 0.6))";
        header.style.padding = "auto";
        header.style.zindex = 9999;
        header.style.fontFamily = "Pacifico";
        return header;
    }

    createFolder(name) {

    }

    create(name) {
        return document.createElement(name);
    }

}

function createCaretAs(direction, as, color) {
    let c = create(as);
    let t = `transparent`;
    c.style.display = "inline";
    c.style.borderTop = `5px solid ${(direction == 'down') ? color : t}`;
    c.style.borderBottom = `5px solid ${(direction == 'up') ? color : t}`;
    c.style.borderLeft = `5px solid ${(direction == 'right') ? color : t}`;
    c.style.borderRight = `5px solid ${(direction == 'left') ? color : t}`;
    c.style.position = "absolute";
    c.style.top = "45px";
    c.style.left = "100px";
    return c;
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}