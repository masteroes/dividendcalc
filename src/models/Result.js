module.exports=function Results(first,second,third){
    this.first=first;
    this.second=second;
    this.third=third;
    return {
        first:this.first,
        second:this.second,
        third:this.third
    }
}