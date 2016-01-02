var bubbles = document.getElementsByClassName("bubble");
var state = document.getElementById('touchstate');
var force = document.getElementById('force');
var touch = null;

[].forEach.call(bubbles, function(entry){
  setupForceClickBehavior(entry);
});

function resetBubble(){
  [].forEach.call(bubbles, function(entry){
    entry.className = 'bubble';
  });
}

/*
function prepareForForceClick(event)
{
  // Cancel the system's default behavior
  event.preventDefault()
  // Perform any other operations in preparation for a force click
}
 
function enterForceClick(event)
{
  // Perform operations in response to entering force click
  console.log('enterForceClick');
}
 
function endForceClick(event)
{
  // Perform operations in response to exiting force click
  console.log('endForceClick');
}
 
function forceChanged(event)
{
  // Perform operations in response to changes in force
  console.log('forceChanged');
}
*/

function touchForce(event){
  for (var i=0; i < event.targetTouches.length; i++) {
    // Add code to "switch" based on the force value. For example
    // minimum pressure versus maximum pressure could result in  
    // different handling of the user's input.
    force.innerHTML = event.targetTouches[i].force;
    console.log("targetTouches[" + i + "].force = " + event.targetTouches[i].force);
  }
}

function onTouchStart(e) {
  e.preventDefault();
  checkForce(e);
}

function onTouchMove(e) {
  e.preventDefault();
  checkForce(e);
}

function onTouchEnd(e) {
  e.preventDefault();
  touch = null;
  if (handle !== undefined){
    window.clearTimeout(handle);
  }
}

function checkForce(e) {
  touch = e.touches[0];
  console.log([e,touch]);
  var handle = window.setTimeout(refreshForceValue.bind(touch), 10);
}

function refreshForceValue() {
  var touchEvent = this;
  var touchElement = this.target;
  var forceValue = 0;

  if(touchEvent) {
    forceValue = touchEvent.force || 0;
    handle = window.setTimeout(refreshForceValue.bind(touch), 10);
  }else{
    forceValue = 0;
  }
  // console.log(touchElement);
  renderElement(forceValue, touchElement);
}

function resetClass(){

}

function setForceState(force, target){
  var level = parseInt(force*5);

  if (!target.classList.contains('full')) {
    target.className = 'bubble';

    switch(level){
      case 1:
      case 2:
        target.classList.add('light');
        break;
      case 3:
      case 4:
        target.classList.add('medium');
        break;
      case 5:
        target.classList.add('full');
        break;
      default:
        target.className = 'bubble';
        break;
    }
  } else {
    target.className = 'bubble full';
  }
}
function renderElement(forceValue, target) {
  // console.log(target);
  // element.style.webkitTransform = 'translateX(-50%) translateY(-50%) scale(' + (1 + forceValue * 1.5) + ')';
  // background.style.webkitFilter = 'blur(' + forceValue * 30 + 'px)';
  setForceState(forceValue, target);
  force.innerHTML = 'Force: ' + forceValue.toString();
}

function setupForceClickBehavior(el)
{
  // Attach event listeners in preparation for responding to force clicks
  /*
  el.addEventListener("webkitmouseforcewillbegin", prepareForForceClick, false);
  el.addEventListener("webkitmouseforcedown", enterForceClick, false);
  el.addEventListener("webkitmouseforceup", endForceClick, false);
  el.addEventListener("webkitmouseforcechanged", forceChanged, false);
  */

  el.addEventListener('touchstart', onTouchStart, false);
  el.addEventListener('touchmove', onTouchMove, false);
  el.addEventListener('touchend', onTouchEnd, false);
}