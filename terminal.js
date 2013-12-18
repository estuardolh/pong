// Generated by CoffeeScript 1.6.3
var Circle, Shape, Square, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Shape = (function() {
  Shape.prototype.vx = 0;

  Shape.prototype.vy = 0;

  Shape.prototype.fx = 1;

  Shape.prototype.fy = 1;

  function Shape(x, y) {
    this.x = x;
    this.y = y;
  }

  Shape.prototype.draw = function() {};

  Shape.prototype.update = function() {
    this.vx = this.fx * this.vx;
    this.vy = this.fy * this.vy;
    this.x += 0.01 * this.vx;
    return this.y += 0.01 * this.vy;
  };

  return Shape;

})();

Square = (function(_super) {
  __extends(Square, _super);

  function Square() {
    _ref = Square.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Square.prototype.setSize = function(width, height) {
    this.width = width;
    return this.height = height;
  };

  Square.prototype.draw = function() {
    ascwar.box(this.x, this.y, this.width, this.height, "+", '-', '|');
  };

  return Square;

})(Shape);

Circle = (function(_super) {
  __extends(Circle, _super);

  function Circle() {
    _ref1 = Circle.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  Circle.prototype.setRadius = function(radius) {
    this.radius = radius;
  };

  Circle.prototype.draw = function() {
    return ascwar.circle(this.x, this.y, this.radius, "1");
  };

  return Circle;

})(Shape);
