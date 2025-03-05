let img;  
let img2;
let img3;
let mySound;

// Bunny variables
let bunnyspeed = 10;
let bunnyx = 20;
let bunnyy = 745;
let bunnydiameter = 60; 

// Image variables
let imageX = -27;
let image2X = -27;
let image2Speed = 8; 
let image3x = 585;

// Finish line
let finishLineX = 650;

// Cloud variables
let cloud1X = 130;
let cloud2X = 10;
let cloud3X = 420;
let cloudSpeed = 1; // Speed at which clouds move

// Control variables
let image2Moving = false; 
let showMessage = false;  
let resetTimer = 0;       
let soundPlaying = false;

function preload(){
  img = loadImage('img/Group 2.png');
  img2 = loadImage('img/Group 3.png');
  img3 = loadImage('img/Group 4.png');
  mySound = loadSound('audio/8 Bit Racing _ Action music - Racing theme - Original Retro Game Music.mp3');
}

function setup() {
  createCanvas(675, 780);
}

function draw() {
  background('lightblue');
  
  // Move clouds
  moveClouds();

  // Draw clouds
  makeCloud(cloud1X, 129);
  makeCloud(cloud2X, 20);
  makeCloud(cloud3X, 100);

  // Ground
  noStroke();
  fill('#B08358');
  rect(1, 600, 800, 180);

  // Bunny hitbox
  noStroke();
  fill('white');
  rect(bunnyx - 20, bunnyy - 20, 40, 30);

  // Images
  image(img3, image3x, 599);
  image(img, imageX, 650); 
  image(img2, image2X, 545); 

  // Moves image2 if the flag is set to true
  if (image2Moving) {
    image2X += image2Speed;

    if (image2X > width) {
      image2X = -img2.width; 
    }
  }

  // Checks if bunny has crossed the finish line
  if (imageX >= finishLineX) {
    image2Moving = false; 
    showMessage = true;   

    // Stop the sound when bunny crosses the finish line
    if (soundPlaying) {
      mySound.stop();
      soundPlaying = false;
    }
   
    // Start delay before resetting the images
    if (resetTimer === 0) {
      resetTimer = millis(); 
    }
  }

  // Displays message when the bunny crosses the finish line
  if (showMessage) {
    fill('black');
    textSize(52);
    text("Move at your own pace", 85, 95); 

    //  2 seconds before resetting the images
    if (millis() - resetTimer > 2000) {
      resetImages(); 
    }
  }
}

// Function to create clouds
function makeCloud(x, y) {
  noStroke();
  fill('white');
  ellipse(x + 100, y + 100, 70, 30);
  ellipse(x + 130, y + 90, 70, 30);
  ellipse(x + 140, y + 110, 80, 35);
}

// Function to move clouds
function moveClouds() {
  cloud1X += cloudSpeed;
  cloud2X += cloudSpeed;
  cloud3X += cloudSpeed;

  // Reset clouds if they move off screen
  if (cloud1X > width) cloud1X = -100;
  if (cloud2X > width) cloud2X = -100;
  if (cloud3X > width) cloud3X = -100;
}

function mousePressed() {
  if (dist(mouseX, mouseY, bunnyx, bunnyy) < bunnydiameter / 2) {
    bunnyx = bunnyx + bunnyspeed;
    imageX = imageX + bunnyspeed;
    image2Moving = true;
    showMessage = false;
    resetTimer = 0; 

    if (!soundPlaying) {
      mySound.play();
      soundPlaying = true;
    }
  }
}

// Resets positions of both images, the bunny, and clouds
function resetImages() {
  bunnyx = 20;
  imageX = -27;
  image2X = -27;
  showMessage = false;
  resetTimer = 0; 

  // Reset cloud positions
  cloud1X = 130;
  cloud2X = 10;
  cloud3X = 420;
}
