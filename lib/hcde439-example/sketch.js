var serial; // variable to hold an instance of the serialport library
var portName = 'COM6' //rename to the name of your port
var datain; //some data coming in over serial!
let redInput; //color inputs
let greenInput;
let blueInput;
let button;
let c;


function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  createCanvas(1200, 800);
  background(0x08, 0x16, 0x40);
 
  redInput = createInput(); //creating inputs per LED color
  redInput.position(100,350);
  redInput.id('rin');
  blueInput = createInput();
  blueInput.position(900 ,350);
  blueInput.id('bin');
  greenInput = createInput();
  greenInput.position(500,350);
  greenInput.id('gin')
  button = createButton('submit');
  button.position(550, 450);
  button.id('sub');
  let x  = document.getElementById('sub');
  print(x);
  console.log(x);
  x.addEventListener("click", writeColor);
  print(x);
  console.log(x);
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
   print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  if (serial.available()) {
  	datain = Number(serial.readLine());
        // console.log(datain);
  }
}



function draw() {
  background(0);
  fill(255);
  textSize(48);
  text('Set the color of your RGB LED!', 250, 80)
  textSize(24)
  text('The values must contain all three digits i.e 000, 024, 124 etc', 275, 150)
  text('Red:', 150, 300);
  text('Green:', 550, 300);
  text('Blue:', 950, 300);

  if (serial.available()) { // checking to see if the LED is connected, informing user
    text("LED Connected", 500,225);
  } else {
    text("Can't find your LED :(", 500,225);
  }

}

function writeColor() {
  console.log('pressed')
  if (serial.available()) {
    console.log('wrote')
    let rVal = redInput.value(); //reading in user values
    let gVal = greenInput.value();
    let bVal = blueInput.value();
    let r1 = rVal % 10; //converting them into single digits to write to serial.
    let r2 = Math.floor(rVal/10) % 10;
    let r3 = Math.floor(rVal / 100);
    let b1 =  bVal % 10;
    let b2 = Math.floor(bVal/10) % 10;
    let b3 = Math.floor(bVal / 100);
    let g1 =  gVal % 10;
    let g2 = Math.floor(gVal/10) % 10;
    let g3 = Math.floor(gVal / 100);
    serial.write(r3);
    serial.write(r2);
    serial.write(r1);
    serial.write(g3);
    serial.write(g2);
    serial.write(g1);
    serial.write(b3);
    serial.write(b2);
    serial.write(b1);
    console.log([r3, r2, r1])
    console.log([g3, g2, g1])
    console.log([b3, b2, b1])
    //c = color((r3 * 100) + (r2 * 10) + r1, (g3 * 100) + (g2 * 10) + g1, (b3 * 100) + (b2 * 10) + b1);
  }
}

