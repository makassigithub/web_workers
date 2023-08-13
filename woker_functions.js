const add = (l,r) => l+r;
const substract = (l,r) => l-r;

this.addEventListener('message',function(e){
    switch(e.data.type){
        case 'add':
            this.postMessage(add.apply(this,e.data.args));
            break;

        case 'substract':
            this.postMessage(substract.apply(this,e.data.args));
            break;
    }
    console.log(this);
})