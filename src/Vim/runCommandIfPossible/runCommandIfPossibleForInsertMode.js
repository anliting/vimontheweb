(function runCommandIfPossibleForInsertMode(vim){
    if(vim.command=='')
        return
    if(vim.command==String.fromCharCode(8)){
        let
            text=
                vim.text.substring(0,vim._cursor.abs-1)+
                vim.text.substring(vim._cursor.abs),
            pos=
                vim._cursor.abs-1
        vim.text=text
        vim._cursor.moveTo(pos)
        vim.command=''
        return
    }
    if(vim.command==String.fromCharCode(27)){
        vim.mode='normal'
        vim.command=''
        return
    }
    if(vim.command==String.fromCharCode(127)){
        vim.text=
            vim.text.substring(0,vim._cursor.abs)+
            vim.text.substring(vim._cursor.abs+1)
        vim.command=''
        return
    }
    vim.text=
        vim.text.substring(0,vim._cursor.abs)+
        vim.command+
        vim.text.substring(vim._cursor.abs)
    vim._cursor.moveTo(
        vim._cursor.abs+vim.command.length
    )
    vim.command=''
})