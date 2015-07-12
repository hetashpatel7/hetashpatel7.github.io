module managers {
    export class Collision {
        //CONSTRUCTOR +++++++++++++++++++++++++++
        constructor() {
        }

        //PUBLIC METHODS ++++++++++++++++++++++++
        // check the distance between hero and any other game object
        public check(gameObject: objects.GameObject) {
        var p1: createjs.Point = new createjs.Point();
        var p2: createjs.Point = new createjs.Point();

        p1.x = hero.x;
        p1.y = hero.y;

        p2.x = gameObject.x;
        p2.y = gameObject.y;


        if (utility.distance(p1, p2) < ((hero.height * 0.5) + (gameObject.height * 0.5))) {
            if (gameObject.isColliding == false) {
                createjs.Sound.play(gameObject.sound);
                if (gameObject.name == "car") {
                    scoreboard.lives--;
                }
                if (gameObject.name == "coin") {
                    scoreboard.score += 100;
                }
            }
            gameObject.isColliding = true;
            if (scoreboard.lives == -1)
            {

                endScreen();//when live=0 call end screen function to display game over message

            }

        }
        else {
            gameObject.isColliding = false;
        }
    }


    }
} 