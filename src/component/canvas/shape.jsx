var dataBuffer = [], myFun


const drawVertex = (ctx, mouseX, mouseY, data) => {
    drwaCircle(ctx, mouseX, mouseY, 10, 'white')

    var id
    if (data.vertices.length === 0) {
        id = 1;
    } else {
        id = data.vertices[data.vertices.length - 1]['id'] + 1
    }
    var vertextData = {
        id,
        label: null,
        x: mouseX,
        y: mouseY,
        radius: 10,
        color: 'white'
    }
    return vertextData;
}

const drwaCircle = (ctx, x, y, radius, colorCode) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.lineWidth = 1
    ctx.fillStyle = colorCode
    ctx.strokeStyle = colorCode
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}


const drawEdges = (ctx, mouseX, mouseY, data) => {

    if (dataBuffer.length !== 0) {
        let result = check_valid_position(mouseX, mouseY, data.vertices)
        if (result) {
            if (dataBuffer[0] === result[0]) {
                return
            }
            document.getElementById("canvas").removeEventListener('mousemove', myFun)
            drawLine(ctx, dataBuffer[1], dataBuffer[2], result[1], result[2], 'white', 3)

            //get weight of the edge
            let weight = window.prompt('Enter weight ')
            while (weight === '' || !Number(weight) || weight === null) {
                if (weight === '0') break
                weight = window.prompt('Enter weight\nWeight must be a number ')
            }

            var edgeData = {
                id1: dataBuffer[0],
                id2: result[0],
                x1: dataBuffer[1],
                y1: dataBuffer[2],
                x2: result[1],
                y2: result[2],
                colorCode: 'white',
                thick: 3,
                label: weight
            }
            dataBuffer = []
            return edgeData
        }
    }
    else {
        let result = check_valid_position(mouseX, mouseY, data.vertices)
        if (result) {
            dataBuffer = result
            var canvas = document.getElementById("canvas")
            canvas.addEventListener('mousemove', myFun = (e) => {
                redraw(canvas, ctx, data)
                drawLine(ctx, dataBuffer[1], dataBuffer[2], e.offsetX, e.offsetY, 'white', 3)
            });
        }
    }
}

const drawLine = (ctx, x1, y1, x2, y2, color, thick) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thick
    ctx.strokeStyle = color
    ctx.stroke();
    ctx.closePath();
}

const redraw = (canvas, ctx, data) => {
    // console.log('data=', data)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    data.edges.forEach(element => {
        drawLine(ctx, element.x1, element.y1, element.x2, element.y2, element.colorCode, element.thick)
    })
    data.vertices.forEach(element => {
        drwaCircle(ctx, element.x, element.y, element.radius, element.color)
    })
}

export const execute = (edges, vertices) => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    redraw(canvas, ctx, { edges, vertices });
}

const check_valid_position = (mouseX, mouseY, data) => {
    for (var i = 0; i < data.length; i++) {
        var dis, X, Y;
        X = Math.pow((data[i].x - mouseX), 2);
        Y = Math.pow((data[i].y - mouseY), 2);
        dis = Math.sqrt(X + Y);
        if (dis <= data[i].radius) {
            return [data[i].id, data[i].x, data[i].y];
        }
    }
    return false;
}


export const Update = (data) => {
    let canvas = document.getElementById('canvas')
    redraw(canvas, canvas.getContext("2d"), data)
}

export const clearListner = () => {
    document.getElementById("canvas").removeEventListener('mousemove', myFun);
    dataBuffer = [];
}

export default function draw(ctx, mouseX, mouseY, data, { addEdge, addVertex }) {
    if (data.activeOperations === 'E1') {
        addVertex(drawVertex(ctx, mouseX, mouseY, data));
    }
    else if (data.activeOperations === '') {
        let edge = drawEdges(ctx, mouseX, mouseY, data);
        if (edge !== undefined && edge !== null)
            addEdge(edge);
    }
}