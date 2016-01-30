'use strict'
!function(){
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
window.HTMLEditor=HTMLEditor
function HTMLEditor(parentnode){
    this.parentnode=parentnode
    this.parentnode.contentEditable=true
}
HTMLEditor.prototype.html=function(){
    return this.parentnode.innerHTML
}
}()
