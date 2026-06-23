const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let points = [];
let closed = false;

canvas.addEventListener("click",(e)=>{

    if(closed) return;

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    points.push({x,y});

    draw();
});

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(points.length===0) return;

    ctx.beginPath();

    ctx.moveTo(points[0].x,points[0].y);

    for(let i=1;i<points.length;i++){

        ctx.lineTo(
            points[i].x,
            points[i].y
        );
    }

    if(closed){
        ctx.closePath();
    }

    ctx.stroke();

    points.forEach(p=>{

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            5,
            0,
            Math.PI*2
        );

        ctx.fill();
    });
}

document
.getElementById("closeShape")
.addEventListener("click",()=>{

    if(points.length<3) return;

    closed = true;

    draw();

    calculate();
});

document
.getElementById("clearShape")
.addEventListener("click",()=>{

    points=[];
    closed=false;

    draw();

    document.getElementById("area")
        .innerHTML="Area: 0";

    document.getElementById("perimeter")
        .innerHTML="Perimeter: 0";
});

function calculate(){

    let area=0;

    for(let i=0;i<points.length;i++){

        let j=(i+1)%points.length;

        area+=
        points[i].x*points[j].y
        -
        points[j].x*points[i].y;
    }

    area=Math.abs(area/2);

    let perimeter=0;

    for(let i=0;i<points.length;i++){

        let j=(i+1)%points.length;

        perimeter+=Math.sqrt(
        Math.pow(points[j].x-points[i].x,2)
        +
        Math.pow(points[j].y-points[i].y,2)
        );
    }

    document.getElementById("area")
    .innerHTML=
    "Area: "+area.toFixed(2);

    document.getElementById("perimeter")
    .innerHTML=
    "Perimeter: "+perimeter.toFixed(2);
}
