function add(l,r) {
    if(!Number(l) || !Number(r)){
        throw 'Bad args provided';
    }
    return l+r;
}

let result = {};

this.addEventListener('message',function(e){
    try{
        result = {
            isError:false,
            error: null,
            value:add.apply(this,e.data)
        }
       
    }catch(e){
       result  = {
        isError:true,
        error: e
       }
    }
    this.postMessage(result);
})