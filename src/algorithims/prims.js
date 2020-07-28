const prims = (data, VertexNo) => {
    //create selected array and graph arr from edgeData
    var selected = []
    selected.push(true)
    for(let i = 0; i < data.length-1; i++ ) {
        selected.push(false)
    }
    let matrix = []
    for (let i = 0; i < VertexNo; i++){
        let temp = []
        for (let j = 0; j < VertexNo; j++){
            temp.push(0)
        }
        matrix.push(temp)
    }

    for (let i = 0; i < data.length; i++){
        try {
            matrix[data[i].id1-1][data[i].id2-1]=data[i].label
            matrix[data[i].id2-1][data[i].id1-1]=data[i].label
        } catch (e) {
            return []
        }
    }

    return calculate(VertexNo, matrix,selected,data);
}


//calculate shortest path by prims
const calculate = (V, G, selected,data) => {
    let array=[]
    let no_edge = 0;

    while(no_edge < V - 1) {
        let min = 9999;
        let x = 0;
        let y = 0;

        for(let i = 0; i < V; i++) {
            if(selected[i]) {
                for(let j = 0; j < V; j++) {
                    if(!selected[j] && G[i][j]) {
                        if(min > G[i][j]) {
                            min = G[i][j];
                            x = i;
                            y = j;
                        }
                    }
                }
            }
        }
        array.push(addEdge(x+1,y+1,data))
        selected[y] = true;
        no_edge++;
    }
    return array;
}


//add selected edge to the data Set
const addEdge = (a,b,data) => {
    let edge = [a,b].sort().join('')

    for(let i = 0; i < data.length; i++) {
        let temp = [data[i].id1,data[i].id2].sort().join('')
        if(temp == edge) {
            return data[i]
        }
    }
    return []
}


export default prims;