const add = (l,r) => l+r;
const substract = (l,r) => l-r;

let result = null;
this.addEventListener('message',function(e){

    switch(e.data.type){
        case 'add':
             result = add.apply(this,e.data.args);
            break;
        case 'substract':
            result = substract.apply(this,e.data.args);
            break
    }
    
    this.postMessage({
        correlationId: e.data.correlationId,
        result
    });
    
})