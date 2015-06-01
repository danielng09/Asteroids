(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }


  var Bullet = Asteroids.Bullet = function (game, pos, vel) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos, vel: vel});
    this.radius = 3;
    this.color = "#FF0000";
    this.isWrappable = false;
    this.type = "Bullet";
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
  
  Bullet.prototype.draw = function(ctx) {
    ctx.beginPath();
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.arc(x, y, this.radius, 0,2*Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

})();
