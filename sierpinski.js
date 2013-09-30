/*global window, document*/
var sierpinski = (function () {
    "use strict";

    var context,
        colors = [
            '9FEE00',
            '86B32D',
            '679B00',
            'B9F73E',
            'C9F76F'
        ],

        setColor = function (i) {
            context.fillStyle = colors[(i - 1) % colors.length];
        },

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
            var canvas = document.getElementById('myCanvas'),
                fullWidth = canvas.width,
                fullHeight = canvas.height,
                iterationCounter = 1,
                iterationThreshold = (Math.log(1 / fullWidth) / Math.log(1 / 3)),
                myInterval;

            context = canvas.getContext('2d');

            setColor(iterationCounter);
            drawCarpet(0, 0, fullWidth, fullHeight, iterationCounter);

            // iteration
            myInterval = window.setInterval(function () {
                context.fillStyle = colors[iterationCounter];
                iterationCounter += 1;

                if (iterationCounter > iterationThreshold) {
                    window.clearInterval(myInterval);
                    return;
                }

                setColor(iterationCounter);
                drawCarpet(0, 0, fullWidth, fullHeight, iterationCounter);
            }, 800);
        };

    init();
}());
