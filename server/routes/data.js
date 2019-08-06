module.exports = function() {
    this.tag = 'climateChange';

    this.getTag = () => {
        return this.tag;
    },

    this.setTag = (newtag) =>{
        console.log(newtag)
        this.tag = newtag;
    }  
}