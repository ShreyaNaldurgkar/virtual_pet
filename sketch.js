//Create variables here
var dog,happyDog,database,foodS,foodStock;

function preload(){
  //load images here
  dogimg = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/Dog.png");
}

function setup() {
  database = firebase.database();
  
  createCanvas(500, 500);
  
  dog = createSprite(250,400,30,30);
  dog.addImage(dogimg);
  dog.scale = 0.1;
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock,showError);
  
}


function draw() {  
 background(46,139,87);

 if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
 }
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x= 0;
  }
  else{
    x = x-1;
  }
   
  database.ref('/').update({food:x})

}

function showError(){
  console.log("Error connecting to the database")
}

