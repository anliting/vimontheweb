(function(vim){
    if(vim.command==String.fromCharCode(8)){
        if(vim.text){
            let
                text=
                    vim.text.substring(0,vim._cursor.abs-1)+
                    vim.text.substring(vim._cursor.abs),
                pos=
                    vim._cursor.abs-1
            vim.text=text
            if(vim.text)
                vim._cursor.moveTo(pos)
            vim.command=''
        }
        return
    }
    if(vim.command==String.fromCharCode(27)){
        vim.mode='normal'
        vim.command=''
        return
    }
    if(vim.command==String.fromCharCode(127)){
        if(vim.text){
            vim.text=
                vim.text.substring(0,vim._cursor.abs)+
                vim.text.substring(vim._cursor.abs+1)
        }
        vim.command=''
        return
    }
    vim.text||(vim.text='\n')
    vim.text=
        vim.text.substring(0,vim._cursor.abs)+
        vim.command.replace(/\r/,'\n')+
        vim.text.substring(vim._cursor.abs)
    vim._cursor.moveTo(vim._cursor.abs+vim.command.length)
    vim.command=''
})