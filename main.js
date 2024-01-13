var video;
var poseNet;
var poses = [];
var leftWristX = 0;
var rightWristX = 0;
var difference = 0;

function setup() {
  // Create a canvas that's at least the inner width and inner height of the window
  createCanvas(window.innerWidth, window.innerHeight);

  // Create a video capture
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  
  // This sets up an event that listens to 'pose' events
  poseNet.on('pose', function(results) {
    poses = results;
  });
  
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
    console.log("Model Loaded");
}

function draw() {
  // Set the background color
  background('#fae');

  // Draw the video
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
  
  // Fetch x coordinate of leftWrist and rightWrist from the result array coming from the posenet model
  if (poses.length > 0) {
    var newLeftWristX = poses[0].pose.keypoints[9].position.x;
    var newRightWristX = poses[0].pose.keypoints[10].position.x;
    difference = floor(newLeftWristX - newRightWristX);
  }

  // Set the text size and color
  textSize(difference);
  fill('#fae');

  // Create text on canvas
  text('Sohan Sunkari', 50, 200);
}