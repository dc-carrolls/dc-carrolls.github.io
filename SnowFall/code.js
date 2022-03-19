var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----


showMobileControls(true, true, true,false);
var grpSnow = createGroup();
var snowFlake;
createEdgeSprites();

for (var i=0;i<50;i++) {
  //fill("white");
  snowFlake = createSprite(randomNumber(0,390), randomNumber(0,390),10,10);
  snowFlake.shapeColor="white";
  snowFlake.velocityY = 1;
  grpSnow.add(snowFlake);
}

var player = createSprite(200,200,30,30);
player.shapeColor="red";
//player.alpha = 1;

function draw() {
  //logic
  var i;
  for (i = 0; i < grpSnow.length; i++ ){
    if (grpSnow.get(i).isTouching(bottomEdge)) {
      grpSnow.get(i).x = randomNumber(0,390);
      grpSnow.get(i).y = 0;
    }
  }
  
  if (keyWentDown("up")){
    player.velocityY = -1;
  } else if (keyWentDown("down")) {
    player.velocityY = 1;
  } else if (keyWentDown("right")) {
    player.velocityX = 1;
  } else if (keyWentDown("left")) {
    player.velocityX = -1; 
  } else if (keyWentUp("up") || keyWentUp("down")) {
    player.velocityY = 0;
    player.velocityX = 0;
  } else if (keyWentUp("left") || keyWentUp("right")) {
    player.velocityY = 0;
    player.velocityX = 0;
  }
  for (i = 0; i < grpSnow.length; i++ ){
    if (grpSnow.get(i).isTouching(player)) {
      grpSnow.get(i).destroy();
    }
  }
    
  
  background("black");
  drawSprites();

  
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
