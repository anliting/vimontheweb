module.repository.visualRange=
    module.shareImport('loadUserInterface/visualRange.js'),
Promise.all([
    module.shareImport('loadUserInterface/prototype.input.js'),
    module.shareImport('loadUserInterface/prototype.ui.js'),
]).then(modules=>{
    return o=>{
        Object.defineProperty(o,'_mainUi',{get(){
            if(!this._values._mainUi){
                this._values._mainUi=this.ui
                this._values._mainUi.width=80
                this._values._mainUi.height=24
            }
            return this._values._mainUi
        }})
        Object.defineProperty(o,'cursor',{get(){
            return this._cursor.abs
        }})
        Object.defineProperty(o,'mode',{get(){
            return this._mode
        }})
        Object.defineProperty(o,'text',{
            set(val){
                this._text=val
                this._welcomeText=undefined
                this._undoBranchManager.clear()
                this._undoBranchManager.push(this._text)
                this._view()
            },get(){
                return this._text
            }
        })
        o.focus=function(){
            this._mainUi.focus()
        }
        Object.defineProperty(o,'input',modules[0])
        Object.defineProperty(o,'ui',modules[1])
    }
})
