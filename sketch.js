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
//wait with a button, then record
//do this with three different switch cases in the draw, one for waiting
//then a flag for running, this is then changed after 10s.

// (waiting) -> (recording) ---> (process and show) -> (allow capture)
//     ^                                |
//     |                                v
//     ------------------------------(reset)

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
    fill(200, 50, 0);
    noStroke();
    for (k = 0; k <21; k++) {
    }
    for (j = 0; j < 21; j++) {
      circle(handObj.left.x[i + j], handObj.left.y[i + j], 10);
    }
    i+= 21;
  }//drawing stuff from the data
}