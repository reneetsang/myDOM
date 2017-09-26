var utils=(function(){
    var flag='getComputedStyle' in window;

    //->listToArray:把类数组转换为数组
    function listToArray(likeAry) {
        if(flag){return Array.prototype.slice.call(likeAry, 0)}
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary[i] = likeAry[i];
        }
        return ary;
    }
    //->toJSON:将JSON格式的字符串转化为JSON格式的对象
    function toJSON(jsonStr) {
        var jsonObj = null;
        try {
            jsonObj = JSON.parse(jsonStr);
        } catch (e) {
            jsonObj = eval("(" + jsonStr + ")");
        }
        return jsonObj;
    }

    //->children:获取指定标签名的所有的元素子节点(获取所有的元素子节定，我们可以通过元素的标签名在进行过滤)
    function children(curEle,tagName){
        var ary=[];
        if(flag){
            ary=this.listToArray(curEle.children);
        }else{
            var nodeList=curEle.childNodes;
            for(var i=0;i<nodeList.length;i++){
                var curNode=nodeList[i];
                curNode.nodeType===1?ary[ary.length]=curNode:null;
            }
            nodeList=null;
        }
        if(typeof tagName==="string"){
            for(var k=0;k<ary.length;k++){
                var curEleNode=ary[k];
                if(curEleNode.nodeName.toLowerCase()!==tagName.toLowerCase()){
                    ary.splice(k,1);
                    k--;//
                }
            }
        }
        return ary;
    }

    //->prev:获取上一个哥哥元素节点
    function prev(curEle){
        if(flag){return curEle.previousElementSibling;}
        var pre=curEle.previousSibling;
        while(pre&&pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    }

    //->next:获取下一个弟弟元素节点
    function next(curEle){
        if(flag){ return curEle.nextElementSibling;}
        var nex=curEle.nextSibling;
        while(nex&&nex.nodeType!==1){
            nex=curEle.nextSibling;
        }
        return nex;
    }

    //->prevAll:获取所有的哥哥元素节点
    function prevAll(curEle){
        var ary=[];
        var pre=this.prev(curEle);
        while(pre){
            ary.unshift(pre);
            pre=this.prev(pre);
        }
        return ary;
    }

    //->nextAll:获取所有的弟弟元素节点
    function nextAll(curEle){
        var ary=[];
        var next=this.next(curEle);
        while(next){
            ary.push(next);
            next=this.next(next);
        }
        return ary;
    }

    //->sibling:获取相邻两个元素节点
    function sibling(curEle){
        var pre=this.prev(curEle);
        var nex=this.next(curEle);
        var ary=[];
        pre?ary.push(pre):null;
        nex?ary.push(nex):null;
        return ary;
    }

    //->index:获取当前元素的索引
    function index(curEle){
        return this.prevAll(curEle).length;
    }

    //->firstChild:获取第一个元素子节点
    function firstChild(curEle){
        var chs=this.children(curEle);
        return chs.length>0?chs[0]:null;
    }

    //->lastChild:获取最后一个元素子节点
    function lastChild(curEle){
        var chs=this.children(curEle);
        return chs.length>0?chs[length-1]:null;
    }

    //->append:向指定容器末尾追加元素
    function append(newEle,container){
        container.appendChild(newEle);
    }

    //->prepend:向指定容器的开头追加元素（把新的元素添加到第一个子元素节点前面，如果一个子元素节点都没有，就放在末尾即可）
    function prepend(newEle,container){
        var fir=this.firstChild(container);
        if(fir){
            container.insertBefore(newEle,fir);
        }
        this.append(newEle,container);
    }

    //->insertBefore:把新元素（newEle）追加到指定元素（oldEle）前面
    function insertBefore(newEle,oldEle){
        oldEle.parentNode.insertBefore(newEle,oldEle);
    }

    //->insertAfter:把新元素（newEle）追加到指定元素（oldEle）的后面
    //相当于追加到oldEle弟弟元素的前面，如果弟弟不存在，也就是当前元素是最后一个了，把新元素放在最末尾即可
    function insertAfter(newEle,oldEle){
        var nex=this.next(oldEle);
        if(nex){
            oldEle.parentNode.insertBefore(newEle,nex);
        }
        oldEle.parentNode.appendChild(newEle);
    }

    return{
        listToArray: listToArray,
        toJSON: toJSON,
        children:children,
        prev:prev,
        next:next,
        prevAll:prevAll,
        nextAll:nextAll,
        sibling:sibling,
        index:index,
        firstChild:firstChild,
        lastChild:lastChild,
        append:append,
        prepend:prepend,
        insertBefore:insertBefore,
        insertAfter:insertAfter
    }

})();
