const worker = new Worker('worker_passingFunctions.js');

        callbacks = {};
        nextCorrelationId = 1;

        let regExp = /\((.*)\).*\{([\s\S]*)\}/m;
            addParts = regExp.exec(add.toString()),
            substractParts = regExp.exec(substract.toString());

        function add (l,r) {
            if(!parseFloat(l) || !parseFloat(r)){
                throw 'Invalid args passed to the worker';
            }else{
                return   l+r;
            }
        
        }
        function substract (l,r) {
            if(!parseFloat(l) || !parseFloat(r)){
                throw 'Invalid args passed to the worker';
            } else {
                return l - r;
            }
        }

        worker.addEventListener('message',function(e){
            if(e.data.isError){
               return console.log('Hum! Something wrong happened!');
            }
            if(callbacks[e.data.correlationId]){
               callbacks[e.data.correlationId](e.data.value);
               delete callbacks[e.data.correlationId];
            }
        })

        worker.postMessage({
            type:'registerFunction',
            name:'add',
            parameters: addParts[1],
            body:addParts[2]
        });

        worker.postMessage({
            type:'registerFunction',
            name:'substract',
            parameters: substractParts[1],
            body:substractParts[2]
        });

        let msg = {
            type:"add",
            args:[5,5],
            correlationId: nextCorrelationId++
        };
        
        callbacks[msg.correlationId] = (function(msg){
            return function(result){
                console.log('the result of add with args ',msg.args, ' is', result);
            }
        })(msg)

        worker.postMessage(msg);



        msg = {
            type:"substract",
            args:[9,5],
            correlationId: nextCorrelationId++
         };
        
        callbacks[msg.correlationId] = (function(msg){
            return function(result){
                console.log('the result of substract with args ',msg.args, ' is', result);
            }
        })(msg)

        worker.postMessage(msg);