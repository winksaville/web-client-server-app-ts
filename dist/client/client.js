"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var nop = require("../../dist/common/nop");
function invokeNop() {
    nop();
}
m.render(document.body, m("div", "Hello, click to ", [
    m("a", { href: "http://localhost:3000" }, "reload"),
    m("br"),
    m("button", { id: "invokeNop", onclick: invokeNop }, "invoke nop directly")
]));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudC9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBNkI7QUFDN0IsMkNBQThDO0FBRTlDO0lBQ0UsR0FBRyxFQUFFLENBQUM7QUFDUixDQUFDO0FBRUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUNwQixDQUFDLENBQUMsS0FBSyxFQUFFLGtCQUFrQixFQUFFO0lBQzNCLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUMsRUFBRSxRQUFRLENBQUM7SUFDakQsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNQLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQztDQUMzRSxDQUFDLENBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG0gZnJvbSBcIm1pdGhyaWxcIjtcbmltcG9ydCBub3AgPSByZXF1aXJlKFwiLi4vLi4vZGlzdC9jb21tb24vbm9wXCIpO1xuXG5mdW5jdGlvbiBpbnZva2VOb3AoKSB7XG4gIG5vcCgpO1xufVxuXG5tLnJlbmRlcihkb2N1bWVudC5ib2R5LFxuICBtKFwiZGl2XCIsIFwiSGVsbG8sIGNsaWNrIHRvIFwiLCBbXG4gICAgbShcImFcIiwge2hyZWY6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCJ9LCBcInJlbG9hZFwiKSxcbiAgICBtKFwiYnJcIiksXG4gICAgbShcImJ1dHRvblwiLCB7aWQ6IFwiaW52b2tlTm9wXCIsIG9uY2xpY2s6IGludm9rZU5vcCB9LCBcImludm9rZSBub3AgZGlyZWN0bHlcIilcbiAgXSlcbik7XG4iXX0=