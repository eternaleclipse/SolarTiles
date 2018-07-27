var setupObjects = {
    tree: function(obj) {
        if (!obj.image) {
            obj.image = "#img_tree"
        }

        if (!obj.message) {
            obj.message = "ouch!"
        }

        obj.onCollide = function() {
            console.log(obj.message)
        }
    },
    portal: function(obj) {
        if (!obj.image) {
            obj.image = "#img_portal_orange"
        }

        obj.onCollide = function() {
            if (!Map.findObjectByTile(obj.destX, obj.destY)){
                Player.x = obj.destX
                Player.y = obj.destY
            }
        }
    },
    mapPortal: function (obj) {
        if (!obj.image) {
            obj.image = "#img_default"
        }

        obj.onCollide = function() {
            Map.load(obj.destMap)
        }
    }
}