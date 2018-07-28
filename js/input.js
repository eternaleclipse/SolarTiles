// Get canvas mouse coords from page event
function getCanvasMousePos(canvas, event) {
    rect = canvas.getBoundingClientRect()
    return {
        x: event.pageX - rect.left,
        y: event.pageY - rect.top
    }
}

function setupInputHandler() {
    /*
    $(function() {    
        $("#gameDiv")
            .on('mousedown touchstart', function (e) {
                console.log("(x,y) = (" + e.pageX + "," + e.pageY +")");
                xDown = e.pageX;
                yDown = e.pageY;
            })
            .on('mouseup touchend',function (e) {
                console.log("(x,y) = (" + e.pageX + "," + e.pageY +")");
                xUp = e.pageX;
                yUp = e.pageY;
                if (xDown != xUp || yDown != yUp) {
                    alert('Swiped');   
                }
            })
        ;    
    })(jQuery);
    */

    $(document).keydown(function(e) {
        if (!Map.inputEnabled) {
            return
        }

        if (Map.mode == "play") {
            switch (e.which) {
            case Keys.up:
                Player.move("up")
                break
        
            case Keys.down:
                Player.move("down")
                break
        
            case Keys.left:
                Player.move("left")
                break
        
            case Keys.right:
                Player.move("right")
                break

            case Keys.e:
                Map.switchMode("edit")
                break
        
            default:
                return
            }
            e.preventDefault()
            updateScreen()
        } else if (Map.mode == "edit") {
            switch (e.which) {
            case Keys.e:
                Map.switchMode("play")
                break

            default:
                break
            }
        }
    });

    $("#gameCanvas").mousemove(function(e) {
        if (Map.mode != "edit") {
            return
        }

        var tile = Map.getTileByPos(getCanvasMousePos($("#gameCanvas")[0], e))
        Map.mouseTile = tile
        updateScreen()
    })
}