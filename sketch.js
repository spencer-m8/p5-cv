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
  let timeStart = currentTime;
}
//let arrayPoints = [];

function draw() {
  background(0);
  //if (currentTime >= timeStart + 10000) {
    //where we do something
  //} else {
    for (let hand of hands) {
      //let i = 0;
      for (let kp of hand.keypoints) {
        //arrayPoints[i] = "" + kp.x + "," + kp.y;
        //i++;
        fill(0, 255, 0);
        noStroke();
        circle(kp.x, kp.y, 10);
        /*for (j = 0; j < arrayPoints.length; j++) {
          console.log("coord: " + arrayPoints[j]);
        }
          */
        //handsArray[numHands][0][j] = kp.x;
        //handsArray[numHands][1][j] = kp.y;
        //console.log("x: " + handsArray[numHands][0][j]);
        //console.log("y: " + handsArray[numHands][1][j]);
        //console.log(kp.x + " " + kp.y);
      }
      //numHands++;
    }
    //data collection
  //}
}

function storePoints(x, y) {
  //add these to an array
}

//10s video
//keep all hand points in arrays
//do math with them
//colour changing