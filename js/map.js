var Map = {
    width:    20, // tiles
    height:   20, // tiles
    tileSize: 32, // px
    loading: false,
    inputEnabled: false,
    tileColor: Colors.lightGreen,
    mouseTile: {
        x: 0,
        y: 0,
    },
    mode: "play",
    drawTile: function(ctx, x, y, color) {
        ctx.fillStyle = Colors.black
        ctx.beginPath()
    
        // Draw Frame
        ctx.moveTo(x * Map.tileSize, y * Map.tileSize)
        ctx.lineTo((x + 1) * Map.tileSize, y * Map.tileSize)
        ctx.lineTo((x + 1) * Map.tileSize, (y + 1) * Map.tileSize)
        ctx.lineTo(x * Map.tileSize, (y + 1) * Map.tileSize)
        ctx.lineTo(x * Map.tileSize, y * Map.tileSize)
        
        // Draw colored background
        ctx.fillStyle = color
        ctx.fillRect(x * Map.tileSize, y * Map.tileSize, Map.tileSize, Map.tileSize);
        ctx.stroke()
    },
    draw: function(ctx) {
        // Draw tiles
        for (var x = 0; x < Map.width; x++) {
            for (var y = 0; y < Map.height; y++) {
                Map.drawTile(ctx, x, y, Map.tileColor)
            }
        }

        // Draw objects
        Map.objects.forEach(function(obj) {
            ctx.drawImage($(obj.image)[0], obj.x * Map.tileSize, obj.y * Map.tileSize, Map.tileSize, Map.tileSize)
        })

        if (Map.mode == "edit") {
            ctx.drawImage($("#img_tree")[0], Map.mouseTile.x * Map.tileSize, Map.mouseTile.y * Map.tileSize, Map.tileSize, Map.tileSize)
        }
    },
    load: function(mapUrl) {
        Map.loading = true
        Map.inputEnabled = false
        $.getJSON(mapUrl, function(mapData) {
            if (mapData.tileColor) {
                if (mapData.tileColor.startsWith("#")) {
                    Map.tileColor = mapData.tileColor
                } else {
                    Map.tileColor = Colors[mapData.tileColor]
                }
            }

            Player.x = mapData.playerX
            Player.y = mapData.playerY

            Map.objects = mapData.objects
            Map.objects.forEach(function(obj) {
                if (setupObjects[obj.type]) {
                    setupObjects[obj.type](obj)
                }
            })

            Map.inputEnabled = true
            Map.loading = false
            updateScreen()
        })
    },
    switchMode: function(mode) {
        switch (mode) {
        case "play":
            Map.mode = "play"
            break

        case "edit":
            Map.mode = "edit"
            break

        default:
            break
        }

        updateScreen()
    },
    objects: [],
    findObjectByTile: function(x, y) {
        var foundObj
        Map.objects.forEach(function(obj) {
            if (obj.x == x && obj.y == y) {
                foundObj = obj
            }
        })
        return foundObj
    },
    // Get tile coords from px coords
    getTileByPos: function(pos) {
        return {
            x: Math.floor(pos.x / Map.tileSize),
            y: Math.floor(pos.y / Map.tileSize)
        }
    }
}