var sierpinski = (function () {

    var context,

        init = function () {
            context = document.getElementById('myCanvas').getContext('2d');
            context.fillStyle='#ccc';
            drawCarpet(0, 0, 400, 400);
        },

        drawCarpet = function (x, y, width, height) {
            var w,
                h,
                i;

            if (width >= 3 && height >= 3) {

                w = width / 3;
                h = height / 3;

                context.fillRect(x + w, y + h, w, h);

                for (i = 0; i < 9; i++) {
                    if (i !== 4) {
                        drawCarpet(x + (i % 3) * w, y + Math.floor(i / 3) * h, w, h);
                    }
                }
            }

        };

    init();
}());
