'use strict';
/*
 * Tiny View
 */
var STABILITY_MODE = false;
var windowTimer = 0;
var videoIndex = 0;
var videoNum = 0;
var videoObject = [
  {
    element: getElement('video1'),
    attached: false,
    active: false
  },
  {
    element: getElement('video2'),
    attached: false,
    active: false
  },
  {
    element: getElement('video3'),
    attached: false,
    active: false
  },
];

/* ---------- common ---------- */

function getElement(id) {
  return document.getElementById(id);
}

/* ---------- video ---------- */

function initVideo() {
  navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
      devices.forEach(function (dev) {
        if (dev.kind === 'videoinput') {
          if (dev.label === '') {
            alert('Please allow camera access');
            return;
          } else {
            console.log(dev.label, dev.deviceId);
          }
        } else {
          return;
        }
        // ROTG01 displays 'USB2.0 PC CAMERA'.
        // Please modify as you like.
        if (dev.label.indexOf('USB2.0 PC CAMERA') !== -1) {
          if (videoIndex <= 2) {
            if (true) {
              attachStream(videoIndex, dev.deviceId);
              videoNum = videoNum + 1;
            } else {
              // for debug
              attachStream(0, dev.deviceId);
              attachStream(1, dev.deviceId);
              attachStream(2, dev.deviceId);
              videoIndex = 3;
            }
            console.log(' -> attached');
          } else {
            console.log(' -> skipped');
          }
          videoIndex = videoIndex + 1;
        } else {
          console.log(' -> skipped');
        }
      });
      if (videoIndex === 0) {
        alert('No video available');
      }
    })
    .catch(function (err) {
      console.error('enumerateDevide ERROR:', err);
    });
}

function attachStream(vidx, did) {
  var maxwidth = (STABILITY_MODE ? 352 : 640);
  var maxfrate = (STABILITY_MODE ? 16 : 32);
  var constraints = {
    audio: false,
    video: {
      deviceId: did,
      width: {
        max: maxwidth
      },
      frameRate: {
        max: maxfrate
      }
    }
  };
  navigator.mediaDevices.getUserMedia(
    constraints
  ).then(function (stream) {
    videoObject[vidx].element.srcObject = stream;
    videoObject[vidx].attached = true;
    videoObject[vidx].active = true;
    console.log('video', vidx + 1, 'active');
    setViews();
  }).catch(function (err) {
    console.error('getUserMedia ERROR:', err);
  });
}

function countActiveView() {
  var num = 0;
  for (var i = 0; i < 3; i++) {
    if (videoObject[i].active === true) {
      num = num + 1;
    }
  }
  return num;
}

function getNthActiveView(num) {
  var found = 0;
  var view = null;
  for (var i = 0; i < 3; i++) {
    if (videoObject[i].active === true) {
      found = found + 1;
      if (found === num) {
        view = getElement('view' + (i + 1));
        break;
      }
    }
  }
  return view;
}

/* ---------- style ---------- */

function setWallTitle() {
  document.body.style.backgroundImage = 'url("' + config.wallpaper + '")';
  getElement('title').innerHTML = config.title;
}

function setWoopers() {
  getElement('face1').src = config.whoopers[0].face;
  getElement('name1').innerHTML += config.whoopers[0].name;
  getElement('face2').src = config.whoopers[1].face;
  getElement('name2').innerHTML += config.whoopers[1].name;
  getElement('face3').src = config.whoopers[2].face;
  getElement('name3').innerHTML += config.whoopers[2].name;
}

function setViews() {
  initViews();
  var num = countActiveView();
  switch (num) {
  case 0:
    break;
  case 1:
    setViewMode1();
    break;
  case 2:
    setViewMode2();
    break;
  case 3:
    setViewMode3();
    break;
  default:
    break;
  }
}

function initViews() {
  getElement('main').style.alignItems = 'center';
  initViewStyle(getElement('view1'));
  initViewStyle(getElement('view2'));
  initViewStyle(getElement('view3'));
  var top = '15px';
  var left = '15px';
  getElement('name1').style.top = top;
  getElement('name2').style.top = top;
  getElement('name3').style.top = top;
  getElement('name1').style.left = left;
  getElement('name2').style.left = left;
  getElement('name3').style.left = left;
}

function initViewStyle(view) {
  view.style.width = 'auto';
  view.style.height = 'auto';
  view.style.left = 'auto';
  view.style.right = 'auto';
  view.style.top = 'auto';
  view.style.buttom = 'auto';
  view.style.border = '2px solid gold';
  view.style.display = 'none';
}

function setViewMode1() {
  console.log('view mode 1');
  var view;
  // view 1
  view = getNthActiveView(1);
  view.style.width = '100vw';
  view.style.height = '75vw';
  view.style.border = 'none';
  view.style.display = 'inline';
  adjustNamePostionTop(view);
  adjustNamePostionLeft(view);
}

function setViewMode2() {
  console.log('view mode 2');
  var view;
  // view 1
  view = getNthActiveView(1);
  view.style.width = '50vw';
  view.style.height = '38vw';
  view.style.left = '0px';
  view.style.display = 'inline';
  adjustNamePostionLeft(view);
  // view 2
  view = getNthActiveView(2);
  view.style.width = '50vw';
  view.style.height = '38vw';
  view.style.right = '0px';
  view.style.display = 'inline';
  adjustNamePostionLeft(view);
}

function setViewMode3() {
  console.log('view mode 3');
  getElement('main').style.alignItems = 'flex-end';
  var view;
  // view 1
  view = getNthActiveView(1);
  view.style.width = '70vh';
  view.style.height = '53vh';
  view.style.top = '0px';
  view.style.display = 'inline';
  adjustNamePostionLeft(view);
  // view 2
  view = getNthActiveView(2);
  view.style.width = '70vh';
  view.style.height = '53vh';
  view.style.left = '0px';
  view.style.display = 'inline';
  adjustNamePostionLeft(view);
  // view 3
  view = getNthActiveView(3);
  view.style.width = '70vh';
  view.style.height = '53vh';
  view.style.right = '0px';
  view.style.display = 'inline';
  adjustNamePostionLeft(view);
}

function adjustNamePostionTop(view) {
  if (view.clientHeight < window.innerHeight) {
    return;
  }
  var top = (15 + ((view.clientHeight - window.innerHeight) / 2)) + 'px';
  getElement('name1').style.top = top;
  getElement('name2').style.top = top;
  getElement('name3').style.top = top;
}

function adjustNamePostionLeft(view) {
  var left = STABILITY_MODE ? '80px' : '15px';
  getElement('name1').style.left = left;
  getElement('name2').style.left = left;
  getElement('name3').style.left = left;
}

/* ---------- control ---------- */

function switchMode(key) {
  if (key !== '1' && key !== '2' && key !== '3') {
    return;
  }
  var idx = parseInt(key) - 1;
  if (videoObject[idx].attached !== true) {
    return;
  }
  videoObject[idx].active = !videoObject[idx].active;
  console.log('video', idx + 1, videoObject[idx].active ? 'active' : 'inactive');
  setViews();
}

window.onresize = function () {
  if (windowTimer > 0) {
    clearTimeout(windowTimer);
  }
  windowTimer = setTimeout(function () {
    setViews();
  }, 200);
};

document.onkeydown = function (e) {
  if (!e) {
    e = window.event;
  }
  switchMode(e.key);
};

function init() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('chrome') === -1) {
    alert('Please use Google Chrome');
  }
  if (location.search === '?s'
      || location.search === '?mode=stability') {
    console.log('stability mode');
    STABILITY_MODE = true;
  }
  setWallTitle();
  setWoopers();
  initVideo();
}

init();