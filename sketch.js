var rocket, rocketImg
var ship, shipImg, shipGroup, lazar, lazarImg;
var stars, starsImg;
var speed = 5, score = 0;
var gameState = "play";
var left, right;
var lives = 3, heart, heartImg, heartGroup;


function preload()
{
  rocketImg = loadImage("Ship.png");
  shipImg = loadImage("Ship2.png")
  starsImg = loadImage("stars.jpg");
  lazarImg = loadImage("lazar.png");
  heartImg = loadImage("heart.png")
}

function setup() 
{
  createCanvas(500, 500);

  stars = createSprite(250, 250, 100, 100);
  stars.addImage(starsImg);
  stars.scale = 2;

  rocket = createSprite(250, 400, 20, 50);
  rocket.addImage(rocketImg);
  rocket.scale = 0.2;

  left = createSprite(10, 250, 10, 400);
  left.visible = false;
  
  right = createSprite(490, 250, 10, 400);
  right.visible = false;

  shipGroup = new Group;
  heartGroup = new Group;

}

function draw()
{
  background(0);

  if(gameState == "play")
  {

    stars.velocityY = speed;
  
    if(stars.y > width)
    {
      stars.y = width/2;
    }
  
    if(keyDown("RIGHT_ARROW"))
    {
      rocket.x += speed - 2;
    }
  
    if(keyDown("LEFT_ARROW"))
    {
      rocket.x -= speed - 2;
    }
  
    Alien();
    hearts();
  
    if(shipGroup.isTouching(rocket))
    {
      if(frameCount % 20 == 0)
      {
        lives -= 1;
      }
      

      if(lives == 0)
      {
        gameState = "end";
      }
    }

    if(heartGroup.isTouching(rocket))
    {
      lives += 1;

      heartGroup.destroyEach();
    }

    if(frameCount % 10 == 0)
    {
      score += 1;
    }

    if(frameCount % 50 == 0)
    {
      speed += 1;

      if(speed > 25)
      {
        speed = 25;
      }
    }

    rocket.collide(left);
    rocket.collide(right);

  }
  else if(gameState == "end")
  {
    rocket.destroy();

    shipGroup.setVelocityYEach(0);
    heartGroup.setVelocityYEach(0);
    stars.velocityY = 0;

    shipGroup.setLifetimeEach(-1);
    heartGroup.setLifetimeEach(-1);
  }

  rocket.setCollider("circle", 20, 0, 200)

  drawSprites();

  textSize(20);
  text("Score:" + score, 30, 30);
  text("Lives:" + lives, 30, 50);

  if(gameState == "end")
  {
    text("Game Over", 200, 250);
  }
}

function Alien()
{

  if(frameCount % 200 == 0)
 {

    ship = createSprite(Math.round(random(20, 480)), -100, 40, 40);
    ship.addImage(shipImg);
    ship.scale = 0.3;
    ship.velocityY = speed;
    ship.lifetime = 500;
    shipGroup.add(ship);
    //ship.debug = true;
    ship.setCollider("circle", 5, 50, 100);

    lazar = createSprite(-100, -70, 35, 500);
    lazar.addImage(lazarImg);
    lazar.x = ship.x + 4;
    lazar.y = ship.y + 280; 
    lazar.velocityY = speed;
    lazar.lifetime = 500;
    shipGroup.add(lazar);
  }
}

function hearts()
{
  if(frameCount % 500 == 0)
  {
    heart = createSprite(-100, -70, 40, 40);
    heart.addImage(heartImg);
    heart.x = Math.round(random(10, 490));
    heart.velocityY = speed;
    heart.lifetime = 500;
    heartGroup.add(heart);
    heart.scale = 0.07;
    heart.setCollider("circle", 0,0, 250)

  }
}
