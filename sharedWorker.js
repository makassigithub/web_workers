// sharedWorker.js
onconnect = function (e) {
    console.log(e);
    var port = e.ports[0];
    
    port.onmessage = function (event) {
      var data = event.data;
      // Process data and send a response back to the main thread
      port.postMessage("Processed: " + data);
    };
    
    port.start();
  };