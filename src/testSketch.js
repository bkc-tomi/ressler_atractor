
const testSketch = (p) => {

    const draw_line = function(x1, y1, x2, y2) {
        p.strokeWeight(3);
        if (x1 === x2) {
            p.line(x1, -p.windowHeight*100, x1, p.windowHeight*100);
        } else {
            var tilt = (y2-y1)/(x2-x1);
            var y_0 = tilt*(-p.windowWidth*100-x1) + y1;
            var y_width = tilt*(p.windowWidth*100-x1) + y1;
            p.line(-p.windowWidth*100, y_0, p.windowWidth*100, y_width);
        } 
    }

    // let [dx, dy, dz] = [0, 0, 0]; //3 dimension displacement
    let [x, y, z] = [-0.015, -0.015, -0.015]; //position(3 dimensions)
    let [bx, by, bz] = [0, 0, 0]; //before position
    let dt=0.01; //time displacement
    let d;
    //parameter of ressler formura
    let a=0.2;
    let b=0.2;
    let c=5.2;

    let off=0; //hue offset value

    let scl = 2000;

    let counter = 0;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 255);
        p.background(0);
        p.blendMode(p.SCREEN);
        p.translate(p.windowWidth/2, p.windowHeight/2);
        window.onresize = function() {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.colorMode(p.HSB, 255);
            p.background(0);
            p.blendMode(p.SCREEN);
            p.translate(p.windowWidth/2, p.windowHeight/2);
        }
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        // if (props.rotation){
        //     rotation = props.rotation * Math.PI / 180
        // }
    }

    p.draw = () => {
        p.translate(p.windowWidth/2, p.windowHeight/2);
        let dx = (-y-z)*dt;
        let dy = (x+a*y)*dt;
        let dz = (b+x*z-c*z)*dt;

        //update position
        x += dx;
        y += dy;
        z += dz;
        //draw line
        var n = p.noise(x/255, y/255, off);
        p.stroke(n*255, 255, 255, 80);
        if (d > 0.07) {
            draw_line(bx*scl, by*scl, x*scl, y*scl);
        } else if (d > 0.03) {
            draw_line(by*scl, bz*scl, y*scl, z*scl);
        } else {
            draw_line(bz*scl, bx*scl, z*scl, x*scl);
        }

        bx=x;
        by=y;
        bz=z;
        off+=0.01;
        counter++;
        if (counter > 300) {
            p.background(0, 0, 0, 100);
            d = p.random(1) * 0.1;
            [x, y, z] = [-d, d, d];
            [bx, by, bz] = [0, 0, 0];
            counter = 0;
        }
    }
}

export default testSketch;