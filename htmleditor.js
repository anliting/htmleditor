'use strict';
function HTMLEditor(parentnode){
    var list_tags=[
        'A',
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6',
        'P',
    ];
    parentnode.className='htmleditor';
    var input=document.createElement('input');
    input.className='htmleditorcursor';
    var keepcursorvisible=function(){
        input.blur();
        input.focus();
    };
    this.onchange=function(){};
    parentnode.onkeydown=function(e){
        if(e.keyCode===13)
            e.preventDefault();
    };
    input.onkeydown=function(e){
        if(e.keyCode===8){ // backspace
            var ins=input.previousSibling;
            if(ins!==null)
                ins.parentNode.removeChild(ins);
        }
        if(e.shiftKey&&e.keyCode===13){ // shift+enter
            var br=document.createElement('br');
            input.parentNode.insertBefore(br,input);
        }
        if(!e.shiftKey&&e.keyCode===13){ // enter
            var v=input;
            while(v.parentNode!==parentnode)
                v=v.parentNode;
            var p=document.createElement('p');
            v.parentNode.insertBefore(p,v.nextSibling);
            input.parentNode.removeChild(input);
            p.appendChild(input);
        }
        if(e.keyCode===37){ // left
            if(input.previousSibling===null){
                if(input.parentNode!=parentnode){ var ip=input.parentNode;
                    ip.removeChild(input);
                    ip.parentNode.insertBefore(input,ip);
                }
            }else{
                if(input.previousSibling.data===undefined){
                    if(list_tags.indexOf(input.previousSibling.tagName)!==-1){
                        var p=input.previousSibling;
                        input.parentNode.removeChild(input);
                        p.appendChild(input);
                    }else{
                        var p=input.previousSibling;
                        var pp=input.previousSibling.parentNode;
                        pp.removeChild(p);
                        pp.insertBefore(p,input.nextSibling);
                    }
                }else{
                    var p=input.previousSibling;
                    if(p.data.length<2){
                        p.parentNode.removeChild(p);
                        input.insertAdjacentHTML('afterend',p.data);
                    }else{
                        var lastchar=p.data[p.data.length-1];
                        p.data=p.data.substring(0,p.data.length-1);
                        input.insertAdjacentHTML('afterend',lastchar);
                    }
                }
            }
        }
        if(e.keyCode===38){ // up
            var ipes=input.previousElementSibling;
            if(ipes){
                input.parentNode.removeChild(input);
                ipes.parentNode.insertBefore(input,ipes);
            }
        }
        if(e.keyCode===39){ // right
            if(input.nextSibling===null){
                if(input.parentNode!=parentnode){
                    var ip=input.parentNode;
                    ip.removeChild(input);
                    ip.parentNode.insertBefore(input,ip.nextSibling);
                }
            }else{
                if(input.nextSibling.data===undefined){
                    if(list_tags.indexOf(input.nextSibling.tagName)!==-1){
                        var p=input.nextSibling;
                        input.parentNode.removeChild(input);
                        p.insertBefore(input,p.firstChild);
                    }else{
                        var p=input.nextSibling;
                        var pp=input.nextSibling.parentNode;
                        pp.removeChild(p);
                        pp.insertBefore(p,input);
                    }
                }else{
                    var p=input.nextSibling;
                    if(p.data.length<2){
                        p.parentNode.removeChild(p);
                        input.insertAdjacentHTML('beforebegin',p.data);
                    }else{
                        var lastchar=p.data[0];
                        p.data=p.data.substring(1,p.data.length);
                        input.insertAdjacentHTML('beforebegin',lastchar);
                    }
                }
            }
        }
        if(e.keyCode===40){ // down
            var ines=input.nextElementSibling;
            if(ines){
                input.parentNode.removeChild(input);
                ines.parentNode.insertBefore(input,ines.nextElementSibling);
            }
        }
        if(e.keyCode===46){ // delete
            var ins=input.nextSibling;
            if(ins!==null)
                ins.parentNode.removeChild(ins);
        }
        keepcursorvisible();
        this.onchange();
    }.bind(this);
    input.oninput=function(e){
        if(input.selectionStart==input.selectionEnd){
            input.insertAdjacentHTML(
                'beforebegin',
                input.value.split(' ').join('&nbsp;')
            );
            input.value='';
            update_source();
        }
        this.onchange();
    }.bind(this);
    parentnode.onclick=function(){
        input.focus();
    };
    if(parentnode.firstChild===null){
        parentnode.appendChild(
            document.createElement('p')
        );
    }
    if(parentnode.firstChild.nodeType===1){
        parentnode.firstChild.insertBefore(
            input,
            parentnode.firstChild.firstChild
        );
    }else if(parentnode.firstChild.nodeType===3){
        parentnode.insertBefore(input,parentnode.firstChild);
    }
    this.html=function(){
        var div=document.createElement('div');
        div.innerHTML=parentnode.innerHTML;
        var cursor=div.getElementsByClassName('htmleditorcursor')[0];
        cursor.parentNode.removeChild(cursor);
        return div.innerHTML;
    };
}
// start general library
function htmltextencode(s){
    var e=document.createElement('div');
    e.appendChild(document.createTextNode(s));
    return e.innerHTML;
}
function htmltextdecode(s){
    var e=document.createElement('div');
    e.innerHTML=s;
    return e.firstChild.data;
}
