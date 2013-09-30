/*global window, document*/
var sierpinski = (function () {
    "use strict";

    var context,
        fullWidth,
        fullHeight,
        colors = [
            [ '9FEE00', '86B32D', '679B00', 'B9F73E', 'C9F76F' ],
            [ '1240AB', '2A4480', '06266F', '4671D5', '6C8CD5' ],
            [ 'CD0074', '992667', '85004B', 'E6399B', 'E667AF' ],
            [ 'FF0000', 'BF3030', 'A60000', 'FF4040', 'FF7373' ],
            [ 'FFFF00', 'BFBF30', 'A6A600', 'FFFF40', 'FFFF73' ],
            [ 'FF8900', 'BF7D30', 'A65900', 'FFA640', 'FFBE73' ]
        ],
        colorIndex,

        setColor = function (i) {
            context.fillStyle = colors[colorIndex][(i - 1) % colors.length];
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

        startAnimation = function () {
            var iterationCounter = 1,
                iterationThreshold = (Math.log(1 / fullWidth) / Math.log(1 / 3)),
                myInterval;

            colorIndex = Math.round(Math.random() * (colors.length - 1));
            setColor(iterationCounter);
            drawCarpet(0, 0, fullWidth, fullHeight, iterationCounter);

            // iteration
            myInterval = window.setInterval(function () {
                context.fillStyle = colors[iterationCounter];
                iterationCounter += 1;

                if (iterationCounter > iterationThreshold) {
                    window.clearInterval(myInterval);
                    startAnimation();
                    return;
                }

                setColor(iterationCounter);
                drawCarpet(0, 0, fullWidth, fullHeight, iterationCounter);
            }, 800);
        },

        init = function () {
            var canvas = document.getElementById('myCanvas');

            fullWidth = canvas.width;
            fullHeight = canvas.height;
            context = canvas.getContext('2d');

            startAnimation();
        };

    init();
}());
