Promise.all([
    module.repository.Cli,
    module.shareImport('viewCursor.js'),
    module.shareImport('../width.js'),
]).then(modules=>{
    let
        Cli=            modules[0],
        viewCursor=     modules[1],
        width=          modules[2]
    function createTextContentCli(view,text,showCursor){
        let
            textCli=new Cli
        let rowsCount
        {
            let currentRowsCount=0
            text.map(l=>{
                if(!l.rows.length)
                    currentRowsCount++
                l.rows.map(row=>{
                    textCli.appendChild({
                        child:row.string,
                        r:currentRowsCount
                    })
                    currentRowsCount++
                })
            })
            rowsCount=currentRowsCount
        }
        if(showCursor)
            textCli.appendChild(cursor(view,text))
        return{
            textCli,
            rowsCount,
        }
    }
    function cursor(view,text){
        let currentRowsCount=0
        let vc=viewCursor(view._vim)
        let
            clientCursor
        text.map(l=>{
            if(!l.rows.length)
                currentRowsCount++
            l.rows.map(row=>{
                if(
                    l.index==vc.r&&(
                        !view.width||
                        row.start<=vc.c&&vc.c<row.end
                    )
                ){
                    let viewC=view.width?vc.c-row.start:vc.c
                    clientCursor={
                        row:currentRowsCount,
                        col:width(row.string.substring(0,viewC)),
                        char:row.string[viewC],
                    }
                }
                currentRowsCount++
            })
        })
        if(clientCursor)
            return{
                child:clientCursor.char||' ',
                r:clientCursor.row,
                c:clientCursor.col,
                style:{
                    backgroundColor:'black',
                    color:'white',
                }
            }
    }
    return createTextContentCli
})
