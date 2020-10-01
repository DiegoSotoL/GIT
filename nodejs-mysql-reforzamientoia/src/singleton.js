let instance = null

class SingletonClass {

    constructor(arg) {
     this.value = arg;
    }

    printValue() {
     return this.value;
    }

    static getInstance() {
     if(!instance) {
         instance = new SingletonClass(arg)
     }

     return instance
    }
}

module.exports = SingletonClass