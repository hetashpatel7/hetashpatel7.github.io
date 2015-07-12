var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // coin Class ++++++++++++++++++++++++++++++++++++++
    var coin = (function (_super) {
        __extends(coin, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++
        function coin(imageString) {
            _super.call(this, imageString);
            this.name = "coin";
            this.sound = "yay";
            this.dx = 5;
            this.reset();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        coin.prototype.checkBounds = function () {
            // check if coin has left screen
            if (this.x < 0 - this.width) {
                this.reset();
            }
        };
        coin.prototype.reset = function () {
            this.y = Math.floor(Math.random() * 640); // start coin at random location
            this.x = 480; // start coin off stage
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        coin.prototype.update = function () {
            this.x -= this.dx; // moves coin down the stage
            this.checkBounds();
        };
        return coin;
    })(objects.GameObject);
    objects.coin = coin;
})(objects || (objects = {}));
//# sourceMappingURL=coin.js.map