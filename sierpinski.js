/*global window, document*/
var sierpinski = (function () {
    "use strict";

    var context,

        drawCarpet = function (x, y, w, h, iteration) {
            var i;

            if (w >= 3 && h >= 3) {

                w = w / 3;
                h = h / 3;

                if (iteration === 1) {
                    context.fillRect(x + w, y + h, w, h);
                } else {
                    for (i = 0; i < 9; i++) {
                        if (i !== 4) {
                            drawCarpet(x + (i % 3) * w, y + Math.floor(i / 3) * h, w, h, iteration - 1);
                        }
                    }
                }
            }
        },

        init = function () {
            var initialWidth = 400,
                initialHeight = 400,
                iterationCounter = 1,
                iterationThreshold = (Math.log(1 / initialWidth) / Math.log(1 / 3)),
                myInterval;

            context = document.getElementById('myCanvas').getContext('2d');
            context.fillStyle = '#ccc';

            drawCarpet(0, 0, initialWidth, initialHeight, iterationCounter);

            // iteration
            myInterval = window.setInterval(function () {
                iterationCounter += 1;

                if (iterationCounter > iterationThreshold) {
                    window.clearInterval(myInterval);
                    return;
                }

                drawCarpet(0, 0, 400, 400, iterationCounter);
            }, 500);
        };

    init();
}());
