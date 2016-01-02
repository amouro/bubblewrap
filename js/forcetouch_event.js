var bubble = document.getElementById("bubble");
var state = document.getElementById('touchstate');
var force = document.getElementById('force');
var touch = null;
console.log(bubble);
setupForceClickBehavior(bubble);

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
}

function checkForce(e) {
  touch = e.touches[0];
  setTimeout(refreshForceValue.bind(touch), 10);
}

function refreshForceValue() {
  var touchEvent = this;
  var forceValue = 0;
  if(touchEvent) {
    forceValue = touchEvent.force || 0;
    setTimeout(refreshForceValue.bind(touch), 10);
  }else{
    forceValue = 0;
  }

  renderElement(forceValue);
}

function setForceState(force){
  var level = parseInt(force*5);
  if (bubble.className !== 'full') {
    switch(level){
      case 1:
      case 2:
        bubble.className = 'light';
        break;
      case 3:
      case 4:
        bubble.className = 'medium';
        break;
      case 5:
        bubble.className = 'full';
        break;
      default:
        bubble.className = '';
        break;
    }
  }
}
function renderElement(forceValue) {
  // element.style.webkitTransform = 'translateX(-50%) translateY(-50%) scale(' + (1 + forceValue * 1.5) + ')';
  // background.style.webkitFilter = 'blur(' + forceValue * 30 + 'px)';
  setForceState(forceValue);
  force.innerHTML = 'Force: ' + forceValue.toString();
}

function setupForceClickBehavior(el)
{
  // Attach event listeners in preparation for responding to force clicks
  el.addEventListener("webkitmouseforcewillbegin", prepareForForceClick, false);
  el.addEventListener("webkitmouseforcedown", enterForceClick, false);
  el.addEventListener("webkitmouseforceup", endForceClick, false);
  el.addEventListener("webkitmouseforcechanged", forceChanged, false);

  el.addEventListener('touchstart', onTouchStart, false);
  el.addEventListener('touchmove', onTouchMove, false);
  el.addEventListener('touchend', onTouchEnd, false);
}