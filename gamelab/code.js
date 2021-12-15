var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["9aaee0c5-e9eb-4dd1-a526-01360382a9dc"],"propsByKey":{"9aaee0c5-e9eb-4dd1-a526-01360382a9dc":{"name":"bowlingball_1","categories":["sports"],"frameCount":1,"frameSize":{"x":393,"y":394},"looping":true,"frameDelay":2,"jsonLastModified":"2021-01-05 19:36:28 UTC","pngLastModified":"2021-01-05 19:36:27 UTC","version":"dFAFQM_6uMulnjS4nj8mgwfHc0bQz2ii","sourceUrl":"assets/api/v1/animation-library/gamelab/dFAFQM_6uMulnjS4nj8mgwfHc0bQz2ii/category_sports/bowlingball.png","sourceSize":{"x":393,"y":394},"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/api/v1/animation-library/gamelab/dFAFQM_6uMulnjS4nj8mgwfHc0bQz2ii/category_sports/bowlingball.png"}}};
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

var ball = createSprite(200, 200,50,50);
//var rWall = createSprite(398,0,2,800);
//var lWall = createSprite(0,0,2,800);
createEdgeSprites();
ball.setAnimation("bowlingball_1");
ball.scale=0.2;
ball.velocityX=2;
ball.velocityY=0;
var ballRotation = 0.0;
function draw() {
  ballRotation += 2.0;
  background("blue");
  ball.rotation=ballRotation;
  ball.bounceOff(edges);
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
