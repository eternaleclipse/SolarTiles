var setupObjects = {
    tree: function(obj) {
        if (!obj.image) {
            obj.image = "#img_tree"
        }

        if (!obj.message) {
            obj.message = "ouch!"
        }

        obj.onCollide = function(collidedObj) {
            if (collidedObj.type == "player") {
                console.log(obj.message)
            }
        }
    },
    portal: function(obj) {
        if (!obj.image) {
            obj.image = "#img_portal_orange"
        }

        obj.onCollide = function(collidedObj) {
            otherCollidedObj = Map.findObjectByTile(obj.destPortalX, obj.destPortalY + 1)
            if (!otherCollidedObj) {
                collidedObj.x = obj.destPortalX
                collidedObj.y = obj.destPortalY + 1
            } else {
                if (otherCollidedObj.onCollide) {
                    destPortal = Map.findObjectByTile(obj.destPortalX, obj.destPortalY)
                    if (destPortal) {
                        otherCollidedObj.onCollide(destPortal)
                    }
                }
            }
        }
    },
    mapPortal: function (obj) {
        if (!obj.image) {
            obj.image = "#img_default"
        }

        obj.onCollide = function(collidedObj) {
            if (collidedObj.type == "player") {
                Map.load(obj.destMap)
            }
        }
    },
    ball: function (obj) {
        if (!obj.image) {
            obj.image = "#img_ball"
        }

        obj.onCollide = function(collidedObj) {
            x = clamp(2 * obj.x - collidedObj.x, 0, Map.width)
            y = clamp(2 * obj.y - collidedObj.y, 0, Map.height)
            if (x == obj.x && y == obj.y) {
                return
            }
            
            otherCollidedObj = Map.findObjectByTile(x, y)
            if (!otherCollidedObj) {
                obj.x = x
                obj.y = y
            } else {
                if (otherCollidedObj.onCollide) {
                    otherCollidedObj.onCollide(obj)
                }
            }

            updateScreen()
        }
    }
}