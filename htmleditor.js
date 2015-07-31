'use strict'
!function(){
window.HTMLEditor=HTMLEditor
function HTMLEditor(parentnode){
    var list_tags=[
        'A',
        'DIV',
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6',
        'P',
        'SPAN',
        'TABLE',
        'THEAD',
        'TBODY',
        'TR',
        'TH',
        'TD',
    ]
    parentnode.contentEditable=true
    this.html=function(){
        return parentnode.innerHTML
    }
}
}()
