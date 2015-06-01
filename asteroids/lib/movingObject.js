( function() {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
    this.type = "MovingObject";
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.beginPath();
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.arc(x, y, this.radius, 0,2*Math.PI, false);
    ctx.lineWidth = 15;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.game.isOutofBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var sum = this.radius + otherObject.radius;
    var diffInX = this.pos[0] - otherObject.pos[0];
    var diffInY = this.pos[1] - otherObject.pos[1];
    var dist = Math.sqrt(Math.pow(diffInX, 2) + Math.pow(diffInY, 2));
    return (dist <= sum ? true : false);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    if (this.type === "Asteroid" && otherObject.type !== "Asteroid" ||
        this.type !== "Asteroid" && otherObject.type === "Asteroid") {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };
})();
