function Cursor(vim){
    this._vim=vim
    this._x=0
    this._y=0
}
Cursor.prototype.moveTo=function(n){
    this._y=this._vim.text.substring(0,n).split('\n').length-1
    this._x=n-(
        this._vim.text.split('\n').slice(0,this.r).join('').length+
        this.r
    )
}
Cursor.prototype.moveToSOL=function(){
    this.moveTo(
        this._vim.text.substring(0,this.abs).lastIndexOf('\n')+1
    )
}
Cursor.prototype.moveToEOL=function(){
    this.moveTo(
        this.abs+this._vim.text.substring(this.abs).indexOf('\n')
    )
}
Cursor.prototype.moveLeft=function(){
    this._x=Math.max(0,this.c-1)
}
Cursor.prototype.moveRight=function(){
    this._x=Math.min(availableCols(this)-1,this.c+1)
}
Cursor.prototype.moveUp=function(){
    this._y=Math.max(0,this._y-1)
}
Cursor.prototype.moveDown=function(){
    this._y=Math.min(this._countOfRows-1,this._y+1)
}
Object.defineProperty(Cursor.prototype,'_countOfRows',{get(){
    return this._vim.text.split('\n').length-1
}})
Object.defineProperty(Cursor.prototype,'_countOfCols',{get(){
    return this._vim.text.split('\n')[this.r].length
}})
Object.defineProperty(Cursor.prototype,'r',{get(){
    return Math.min(this._countOfRows-1,Math.max(0,this._y))
}})
Object.defineProperty(Cursor.prototype,'c',{get(){
    return Math.min(availableCols(this)-1,Math.max(0,this._x))
}})
Object.defineProperty(Cursor.prototype,'abs',{get(){
    return this._vim.text.split('\n').slice(0,this.r).join('').length+
        this.r+
        this.c
}})
function availableCols(c){
    if(c._vim.mode=='normal')
        return Math.max(1,c._countOfCols)
    if(c._vim.mode=='insert')
        return c._countOfCols+1
}
Cursor
