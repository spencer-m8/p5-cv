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
  handPose.detectStart(video, function(results) {
    hands = results;
  });
}

let maxHands = 3;
let handsArray = [];
handsArray.length = maxHands;
let numHands = 0;

function draw() {
  background(0);
  for (let hand of hands) {
    let j = 0;
    for (let kp of hand.keypoints) {
      fill(0, 255, 0);
      noStroke();
      circle(kp.x, kp.y, 10);
      handsArray[numHands][0][j] = kp.x;
      handsArray[numHands][1][j] = kp.y;
      console.log("x: " + handsArray[numHands][0][j]);
      console.log("y: " + handsArray[numHands][1][j]);
    }
    numHands++;
  }
}

//10s video
//keep all hand points in arrays
//do math with them
//colour changing