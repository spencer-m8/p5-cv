// canonical hand pose detection script
// I took bits of this from the ML5 website 
// Michael Palumbo

let handPose;
let hands = [];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  let video = createCapture(VIDEO);
  video.hide();
  handPose.detectStart(video, function (results) {
    hands = results;
  });
}
let current = 0;
const start = Date.now();

let handObj = {
  left: {
    x: [],
    y: [],
  },
  right: {
    x: [],
    y: []
  }
}

let i = 0;

function draw() {
  if (!(Date.now() >= start + 10000)) {
    background(0);
    for (let hand of hands) {
      if (hands.length == 1) {
        for (let kp of hand.keypoints) {
          handObj.left.x.push(kp.x);
          handObj.left.y.push(kp.y);
          fill(0, 255, 0);
          noStroke();
          circle(kp.x, kp.y, 10);
        }
      }
    }
    console.log(handObj.left.x.length)
  } else {
    let xVals = [];
    let yVals = [];

    // gets all of the values for the current hand frame
    for (k = 0; k < 21; k++) {
      xVals.push(handObj.left.x[i + k])
      yVals.push(handObj.left.y[i + k])
    }

    //x vals how far are u apart
    xVals.sort((a, b) => b - a);
    let sumX = 0;
    for (let v = 0; v < xVals.length - 1; ++v) {
      sumX += xVals[v] - xVals[v + 1];
    }

    //y vals how far are u apart
    yVals.sort((a, b) => b - a);
    let sumY = 0;
    for (let v = 0; v < yVals.length - 1; ++v) {
      sumY += yVals[v] - yVals[v + 1];
    }

    
    fill(map(random(), 0, 1, 0, 255), 0, 0);
    noStroke();

    for (j = 0; j < 21; j++) {
      circle(handObj.left.x[i + j], handObj.left.y[i + j], sumX+sumY);
    }
    i += 21;
  }//drawing stuff from the data
}