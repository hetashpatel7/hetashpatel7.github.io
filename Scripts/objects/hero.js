var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // hero Class ++++++++++++++++++++++++++++++++++++++
    var hero = (function (_super) {
        __extends(hero, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++
        function hero(imageString) {
            _super.call(this, imageString);
            this.sound = "engine";
            this.x = 100;
            createjs.Sound.play(this.sound, { "loop": -1 });
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        hero.prototype.update = function () {
            this.y = stage.mouseY; // position hero under mouse
        };
        return hero;
    })(objects.GameObject);
    objects.hero = hero;
})(objects || (objects = {}));
//# sourceMappingURL=hero.js.map