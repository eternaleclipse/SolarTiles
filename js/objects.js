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
            if (!Map.findObjectByTile(obj.destX, obj.destY)){
                collidedObj.x = obj.destX
                collidedObj.y = obj.destY
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
            x = 2 * obj.x - collidedObj.x
            y = 2 * obj.y - collidedObj.y
            
            otherCollidedObj = Map.findObjectByTile(x, y)
            if (!otherCollidedObj){
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