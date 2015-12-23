
var video = document.getElementById("thumb");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var thumbnailContainter = document.getElementById("thumbnail");
var button = document.getElementById("grab");

function grabScreenshot() {
  ctx.drawImage(video, 0, 0);
  var img = new Image();
  img.className = 'thumbnail'
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = canvas.toDataURL("image/png");
  thumbnailContainter.appendChild(img);
}

button.addEventListener("click", function(){
  grabScreenshot();
});

/************************************************************************************************/

// var video = $('#thumb');
// var canvas = $('#canvas');
// var thumbnailContainter = $("#thumbnail");
// var button = $("#grab");
// var ctx = canvas[0].getContext("2d")

// // debugger;

// function grabScreenshot() {
//   ctx.drawImage(video, 0, 0, 300, 150);
//   var img = new Image();
//   img.className = 'thumbnail'
//   img.setAttribute('crossOrigin', 'anonymous');
//   img.src = canvas.toDataURL("image/png");
//   thumbnailContainter.append(img);
// }

// button.click(function(){
//   grabScreenshot();
// });