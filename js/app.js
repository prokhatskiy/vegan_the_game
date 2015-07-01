window.game = new window.VGN.Game();

setInterval(function() {
    var canvas = game.getCanvasSize();
    var player = game.player.getPosition();
    var food = game.food;

    var html = '<h1>The Game</h1>' +
        '<p> Canvas size: ' + canvas.width + ' x ' + canvas.height + ' </p>' +
        '<h2>Player</h2>' +
        '<p> Position: X = ' + player.x + '; Y = ' + player.y + ' </p>';

    for(var i = 0; i < food.length; i++) {
        var type =  food[i].getType();
        var pos = food[i].getPosition();
        html += '<h3>Meal</h3><p>Type:' + type + '<br>Position: X = ' + pos.x + '; Y = ' + pos.y + '</p>'
    }
    document.body.innerHTML = html;
}, 10);
