module objects {
    // car Class ++++++++++++++++++++++++++++++++++++++
    export class car extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++
        constructor(imageString: string) {
            super(imageString);

            this.name = "car";
            this.sound = "thunder";
            this.dx = 5;
            this.reset();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        private checkBounds(): void {

            // check if car has left screen
            if (this.x< 0-this.width) {
                this.reset();
            }
        }


        private reset(): void {
            this.y = Math.floor(Math.random() * 480); // start car at random location
            this.x = 640; // start car off stage
          //  this.dx = Math.floor(Math.random() * 5) + 5;
         //   this.dy = Math.floor(Math.random() * 4) - 2;
            

        }


        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        public update(): void {

           // this.y -= this.dy; // moves  down the stage
            this.x -= this.dx; // drifts car to left
            this.checkBounds();
        }
    }
}  