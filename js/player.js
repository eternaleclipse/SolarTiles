var Player = {
    x: 0,
    y: 0,
    type: "player",
    move: function(direction) {
        var destX = Player.x
        var destY = Player.y

        switch (direction) {
        case "up":
            destY = Math.max(0, Player.y - 1)
            break
    
        case "down":
            destY = Math.min(19, Player.y + 1)
            break
    
        case "left":
            destX = Math.max(0, Player.x - 1)
            break
    
        case "right":
            destX = Math.min(19, Player.x + 1)
            break
        }

        collidedObj = Map.findObjectByTile(destX, destY)
        if (collidedObj) {
            if (collidedObj.onCollide) {
                collidedObj.onCollide(Player)
            }
        }
        else {
            Player.x = destX
            Player.y = destY
        }
    },
    draw: function (ctx) {
        ctx.drawImage($("#img_player")[0], Player.x * Map.tileSize, Player.y * Map.tileSize)
    }
}