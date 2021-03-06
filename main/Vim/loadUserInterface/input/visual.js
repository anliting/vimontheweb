import visualRange from '../visualRange.js'
import shift from './shift.js'
function main(vim,val){
    if(typeof val=='string'){
        if(val=='d'){
            let
                r=visualRange(vim),
                b=vim._text.substring(r.s,r.e)
            vim._text={
                function:'delete',
                start:r.s,
                end:r.e,
            }
            vim._registers['"']={mode:'string',string:b}
            vim._trueCursor.moveTo(r.s)
            vim._mode='normal'
            return
        }
        if(val=='h')
            return vim._trueCursor.moveLeft()
        if(val=='j')
            return vim._trueCursor.moveDown()
        if(val=='k')
            return vim._trueCursor.moveUp()
        if(val=='l')
            return vim._trueCursor.moveRight()
        if(val=='y'){
            let r=visualRange(vim)
            vim._registers['"']={
                mode:'string',
                string:vim._text.substring(r.s,r.e),
            }
            vim._trueCursor.moveTo(r.s)
            vim._mode='normal'
            return
        }
        if(val=='<'){
            let r=visualRange(vim)
            let cursor=Object.create(vim._trueCursor)
            cursor.moveTo(r.s)
            let s=cursor.r
            cursor.moveTo(r.e)
            let e=cursor.r
            shift.left(vim,s,e+1)
            vim._mode='normal'
            return
        }
        if(val=='>'){
            let r=visualRange(vim)
            let cursor=Object.create(vim._trueCursor)
            cursor.moveTo(r.s)
            let s=cursor.r
            cursor.moveTo(r.e)
            let e=cursor.r
            shift.right(vim,s,e+1)
            vim._mode='normal'
            return
        }
    }else if(typeof val=='object'){
        if(
            val.key=='Escape'||
            val.ctrlKey&&val.key=='c'||
            val.ctrlKey&&val.key=='['
        )
            return vim._mode='normal'
    }
}
export default(vim,val)=>{
    main(vim,val)
    vim._ui()
}
