module.exports=function Bet(type, selections, stake) {
    this.type = type;
    this.selections = selections;
    this.stake = stake;
    return {
        type: this.type,
        selections: this.selections,
        stake: this.stake
    }
}