/*global document*/
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
            context = document.getElementById('myCanvas').getContext('2d');
            context.fillStyle = '#ccc';
            drawCarpet(0, 0, 400, 400, 1);
            drawCarpet(0, 0, 400, 400, 2);
            drawCarpet(0, 0, 400, 400, 3);
        };

    init();
}());
