var serial; // variable to hold an instance of the serialport library
var portName = 'COM6' //rename to the name of your port
var datain; //some data coming in over serial!
var xPos = 0;


function setup() {
  // put setup code here
  createCanvas(1200, 800);
  background(0,255,80);
}

function draw() {
  // put drawing code here
  ellipse(250, 50, 80, 80);
}

