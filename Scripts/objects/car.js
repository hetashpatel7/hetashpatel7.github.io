var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // car Class ++++++++++++++++++++++++++++++++++++++
    var car = (function (_super) {
        __extends(car, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++
        function car(imageString) {
            _super.call(this, imageString);
            this.name = "car";
            this.sound = "thunder";
            this.dx = 5;
            this.reset();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        car.prototype.checkBounds = function () {
            // check if car has left screen
            if (this.x < 0 - this.width) {
                this.reset();
            }
        };
        car.prototype.reset = function () {
            this.y = Math.floor(Math.random() * 480); // start car at random location
            this.x = 640; // start car off stage
            //  this.dx = Math.floor(Math.random() * 5) + 5;
            //   this.dy = Math.floor(Math.random() * 4) - 2;
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        car.prototype.update = function () {
            // this.y -= this.dy; // moves  down the stage
            this.x -= this.dx; // drifts car to left
            this.checkBounds();
        };
        return car;
    })(objects.GameObject);
    objects.car = car;
})(objects || (objects = {}));
//# sourceMappingURL=car.js.map