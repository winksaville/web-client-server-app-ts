"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var http = require("http");
var nop = require("../../dist/common/nop");
var debugModule = require("debug");
var debug = debugModule("server");
var PORT = 3000;
// Create a server and the handler for a few requests
var httpServer = http.createServer(function (req, res) {
    debug("req.url=%s res=%s", req.url, res);
    switch (req.url) {
        case "/": {
            // Write the header
            res.writeHead(200, {
                "charset": "UTF-8",
                "content-type": "text/html",
            });
            // Send index.html as the content
            fs.createReadStream("./public/index.html").pipe(res);
            break;
        }
        case "/nop": {
            nop();
            // Return 200 OK
            res.writeHead(200, {
                "charset": "UTF-8",
                "content-type": "text/html",
            });
            // And the content is the url
            res.end("OK req.url=" + req.url);
            break;
        }
        case "/build/bundle.js": {
            // Write the header
            res.writeHead(200, {
                "charset": "UTF-8",
                "content-type": "text/javascript",
            });
            // Send bundle.js as the content
            fs.createReadStream("./dist/client/bundle.nyc.js").pipe(res);
            break;
        }
        default: {
            debug("default: err 404 req.url=" + req.url);
            // Not found send a 404 header
            res.writeHead(404, {
                "charset": "UTF-8",
                "content-type": "text/html",
            });
            // And the content is the url
            res.end("bad req.url=" + req.url);
            break;
        }
    }
});
// Start it listening on the desired port
httpServer.listen(PORT, function () {
    debug("Listening on: http://localhost:%s", PORT);
    // Output to stdout a message that we're running
    process.stdout.write("running PORT=" + PORT);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1QkFBeUI7QUFDekIsMkJBQTZCO0FBQzdCLDJDQUE4QztBQUU5QyxtQ0FBcUM7QUFFckMsSUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXBDLElBQU0sSUFBSSxHQUFXLElBQUksQ0FBQztBQUUxQixxREFBcUQ7QUFDckQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFDLEdBQXlCLEVBQUUsR0FBd0I7SUFDdkYsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNULG1CQUFtQjtZQUNuQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDakIsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLGNBQWMsRUFBRSxXQUFXO2FBQzVCLENBQUMsQ0FBQztZQUVILGlDQUFpQztZQUNqQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsS0FBSyxDQUFDO1FBQ1IsQ0FBQztRQUNELEtBQUssTUFBTSxFQUFFLENBQUM7WUFDWixHQUFHLEVBQUUsQ0FBQztZQUVOLGdCQUFnQjtZQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDakIsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLGNBQWMsRUFBRSxXQUFXO2FBQzVCLENBQUMsQ0FBQztZQUVILDZCQUE2QjtZQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsS0FBSyxDQUFDO1FBQ1IsQ0FBQztRQUNELEtBQUssa0JBQWtCLEVBQUUsQ0FBQztZQUN4QixtQkFBbUI7WUFDbkIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLFNBQVMsRUFBRSxPQUFPO2dCQUNsQixjQUFjLEVBQUUsaUJBQWlCO2FBQ2xDLENBQUMsQ0FBQztZQUVILGdDQUFnQztZQUNoQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0QsS0FBSyxDQUFDO1FBQ1IsQ0FBQztRQUNELFNBQVMsQ0FBQztZQUNSLEtBQUssQ0FBQywyQkFBMkIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFN0MsOEJBQThCO1lBQzlCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNqQixTQUFTLEVBQUUsT0FBTztnQkFDbEIsY0FBYyxFQUFFLFdBQVc7YUFDNUIsQ0FBQyxDQUFDO1lBRUgsNkJBQTZCO1lBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxLQUFLLENBQUM7UUFDUixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgseUNBQXlDO0FBQ3pDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO0lBQ3RCLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVqRCxnREFBZ0Q7SUFDaEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWdCLElBQU0sQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XG5pbXBvcnQgbm9wID0gcmVxdWlyZShcIi4uLy4uL2Rpc3QvY29tbW9uL25vcFwiKTtcblxuaW1wb3J0ICogYXMgZGVidWdNb2R1bGUgZnJvbSBcImRlYnVnXCI7XG5cbmNvbnN0IGRlYnVnID0gZGVidWdNb2R1bGUoXCJzZXJ2ZXJcIik7XG5cbmNvbnN0IFBPUlQ6IG51bWJlciA9IDMwMDA7XG5cbi8vIENyZWF0ZSBhIHNlcnZlciBhbmQgdGhlIGhhbmRsZXIgZm9yIGEgZmV3IHJlcXVlc3RzXG5jb25zdCBodHRwU2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKHJlcTogaHR0cC5JbmNvbWluZ01lc3NhZ2UsIHJlczogaHR0cC5TZXJ2ZXJSZXNwb25zZSkgPT4ge1xuICBkZWJ1ZyhcInJlcS51cmw9JXMgcmVzPSVzXCIsIHJlcS51cmwsIHJlcyk7XG4gIHN3aXRjaCAocmVxLnVybCkge1xuICAgIGNhc2UgXCIvXCI6IHtcbiAgICAgIC8vIFdyaXRlIHRoZSBoZWFkZXJcbiAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7XG4gICAgICAgIFwiY2hhcnNldFwiOiBcIlVURi04XCIsXG4gICAgICAgIFwiY29udGVudC10eXBlXCI6IFwidGV4dC9odG1sXCIsXG4gICAgICB9KTtcblxuICAgICAgLy8gU2VuZCBpbmRleC5odG1sIGFzIHRoZSBjb250ZW50XG4gICAgICBmcy5jcmVhdGVSZWFkU3RyZWFtKFwiLi9wdWJsaWMvaW5kZXguaHRtbFwiKS5waXBlKHJlcyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcIi9ub3BcIjoge1xuICAgICAgbm9wKCk7XG5cbiAgICAgIC8vIFJldHVybiAyMDAgT0tcbiAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7XG4gICAgICAgIFwiY2hhcnNldFwiOiBcIlVURi04XCIsXG4gICAgICAgIFwiY29udGVudC10eXBlXCI6IFwidGV4dC9odG1sXCIsXG4gICAgICB9KTtcblxuICAgICAgLy8gQW5kIHRoZSBjb250ZW50IGlzIHRoZSB1cmxcbiAgICAgIHJlcy5lbmQoXCJPSyByZXEudXJsPVwiICsgcmVxLnVybCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcIi9idWlsZC9idW5kbGUuanNcIjoge1xuICAgICAgLy8gV3JpdGUgdGhlIGhlYWRlclxuICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHtcbiAgICAgICAgXCJjaGFyc2V0XCI6IFwiVVRGLThcIixcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJ0ZXh0L2phdmFzY3JpcHRcIixcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTZW5kIGJ1bmRsZS5qcyBhcyB0aGUgY29udGVudFxuICAgICAgZnMuY3JlYXRlUmVhZFN0cmVhbShcIi4vZGlzdC9jbGllbnQvYnVuZGxlLm55Yy5qc1wiKS5waXBlKHJlcyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgZGVidWcoXCJkZWZhdWx0OiBlcnIgNDA0IHJlcS51cmw9XCIgKyByZXEudXJsKTtcblxuICAgICAgLy8gTm90IGZvdW5kIHNlbmQgYSA0MDQgaGVhZGVyXG4gICAgICByZXMud3JpdGVIZWFkKDQwNCwge1xuICAgICAgICBcImNoYXJzZXRcIjogXCJVVEYtOFwiLFxuICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcInRleHQvaHRtbFwiLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEFuZCB0aGUgY29udGVudCBpcyB0aGUgdXJsXG4gICAgICByZXMuZW5kKFwiYmFkIHJlcS51cmw9XCIgKyByZXEudXJsKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIFN0YXJ0IGl0IGxpc3RlbmluZyBvbiB0aGUgZGVzaXJlZCBwb3J0XG5odHRwU2VydmVyLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gIGRlYnVnKFwiTGlzdGVuaW5nIG9uOiBodHRwOi8vbG9jYWxob3N0OiVzXCIsIFBPUlQpO1xuXG4gIC8vIE91dHB1dCB0byBzdGRvdXQgYSBtZXNzYWdlIHRoYXQgd2UncmUgcnVubmluZ1xuICBwcm9jZXNzLnN0ZG91dC53cml0ZShgcnVubmluZyBQT1JUPSR7UE9SVH1gKTtcbn0pO1xuIl19