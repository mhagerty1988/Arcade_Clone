// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (dt * this.speed);
    // Reset position when it moves off the board.
    if (this.x > 500) {
        this.reset();
    }
    // Detect collision with player and execute if any.
    if (this.collisionDetected()) {
        this.collision();
    }
};
//Sets coordinates
Enemy.prototype.reset = function() {
    this.x = -1 * (Math.floor(Math.random() * 300) + 100);
    var startY = [62, 62, 62, 62, 145, 145, 145, 230, 230];
    this.y = startY[Math.floor(Math.random() * startY.length)];
    // speed
    this.speed = Math.floor(Math.random() * 350) + 80;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Determine if enemy is close enough to player to cause a collision
Enemy.prototype.collisionDetected = function() {
    Xcollided = (this.x > player.x - 70 && this.x < player.x + 70);
    Ycollided = (this.y > player.y - 30 && this.y < player.y + 30);
    return (Xcollided && Ycollided);
};
Enemy.prototype.collision = function() {
    player.reset();
};
// This player
var Player = function() {
    this.reset();
    this.sprite = 'images/char-boy.png';
};
// Resets player position
Player.prototype.update = function() {
    if (this.y < 0) {
        this.reset();
    }
};
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 385;
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Moves player.
Player.prototype.handleInput = function(keyPress) {
    var x = this.x;
    var y = this.y;

    switch (keyPress) {
        case 'up':
            y -= 83;
            break;
        case 'right':
            x += 100;
            break;
        case 'down':
            y += 83;
            break;
        case 'left':
            x -= 100;
            break;
    }
    // Bounds
    x = Math.min(Math.max(x, 0), 400);
    y = Math.min(Math.max(y, -30), 385);

    this.x = x;
    this.y = y;
};
// Enemy and Player objects.
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
};
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
