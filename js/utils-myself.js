var utils=(function(){
    var flag='getComputedStyle' in window;

    //->listToArray:��������ת��Ϊ����
    function listToArray(likeAry) {
        if(flag){return Array.prototype.slice.call(likeAry, 0)}
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary[i] = likeAry[i];
        }
        return ary;
    }
    //->toJSON:��JSON��ʽ���ַ���ת��ΪJSON��ʽ�Ķ���
    function toJSON(jsonStr) {
        var jsonObj = null;
        try {
            jsonObj = JSON.parse(jsonStr);
        } catch (e) {
            jsonObj = eval("(" + jsonStr + ")");
        }
        return jsonObj;
    }

    //->children:��ȡָ����ǩ�������е�Ԫ���ӽڵ�(��ȡ���е�Ԫ���ӽڶ������ǿ���ͨ��Ԫ�صı�ǩ���ڽ��й���)
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

    //->prev:��ȡ��һ�����Ԫ�ؽڵ�
    function prev(curEle){
        if(flag){return curEle.previousElementSibling;}
        var pre=curEle.previousSibling;
        while(pre&&pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    }

    //->next:��ȡ��һ���ܵ�Ԫ�ؽڵ�
    function next(curEle){
        if(flag){ return curEle.nextElementSibling;}
        var nex=curEle.nextSibling;
        while(nex&&nex.nodeType!==1){
            nex=curEle.nextSibling;
        }
        return nex;
    }

    //->prevAll:��ȡ���еĸ��Ԫ�ؽڵ�
    function prevAll(curEle){
        var ary=[];
        var pre=this.prev(curEle);
        while(pre){
            ary.unshift(pre);
            pre=this.prev(pre);
        }
        return ary;
    }

    //->nextAll:��ȡ���еĵܵ�Ԫ�ؽڵ�
    function nextAll(curEle){
        var ary=[];
        var next=this.next(curEle);
        while(next){
            ary.push(next);
            next=this.next(next);
        }
        return ary;
    }

    //->sibling:��ȡ��������Ԫ�ؽڵ�
    function sibling(curEle){
        var pre=this.prev(curEle);
        var nex=this.next(curEle);
        var ary=[];
        pre?ary.push(pre):null;
        nex?ary.push(nex):null;
        return ary;
    }

    //->index:��ȡ��ǰԪ�ص�����
    function index(curEle){
        return this.prevAll(curEle).length;
    }

    //->firstChild:��ȡ��һ��Ԫ���ӽڵ�
    function firstChild(curEle){
        var chs=this.children(curEle);
        return chs.length>0?chs[0]:null;
    }

    //->lastChild:��ȡ���һ��Ԫ���ӽڵ�
    function lastChild(curEle){
        var chs=this.children(curEle);
        return chs.length>0?chs[length-1]:null;
    }

    //->append:��ָ������ĩβ׷��Ԫ��
    function append(newEle,container){
        container.appendChild(newEle);
    }

    //->prepend:��ָ�������Ŀ�ͷ׷��Ԫ�أ����µ�Ԫ����ӵ���һ����Ԫ�ؽڵ�ǰ�棬���һ����Ԫ�ؽڵ㶼û�У��ͷ���ĩβ���ɣ�
    function prepend(newEle,container){
        var fir=this.firstChild(container);
        if(fir){
            container.insertBefore(newEle,fir);
        }
        this.append(newEle,container);
    }

    //->insertBefore:����Ԫ�أ�newEle��׷�ӵ�ָ��Ԫ�أ�oldEle��ǰ��
    function insertBefore(newEle,oldEle){
        oldEle.parentNode.insertBefore(newEle,oldEle);
    }

    //->insertAfter:����Ԫ�أ�newEle��׷�ӵ�ָ��Ԫ�أ�oldEle���ĺ���
    //�൱��׷�ӵ�oldEle�ܵ�Ԫ�ص�ǰ�棬����ܵܲ����ڣ�Ҳ���ǵ�ǰԪ�������һ���ˣ�����Ԫ�ط�����ĩβ����
    function insertAfter(newEle,oldEle){
        var nex=this.next(oldEle);
        if(nex){
            oldEle.parentNode.insertBefore(newEle,nex);
        }
        oldEle.parentNode.appendChild(newEle);
    }

    //getElementsByClass:ͨ��Ԫ�ص���ʽ����ȡһ��Ԫ�ؼ���(����ȫ���������)
    function getElementsByClass(strClass,context){
        context=context||document;
        if(flag){
            return this.listToArray(context.getElementsByClassName(strClass))
        }
        var ary=[],strClassAry=strClass.replace(/(^ +| +$)/g,"").split(/ +/g);
        var nodeList=context.getElementsByTagName("*");
        for(var i=0,len=nodeList.length;i<len;i++){
            var curNode=nodeList[i];
            var isOk=true;
            for(var k=0;k<strClassAry.length;k++){
                var reg=new RegExp("(^ +|)"+strClassAry[k]+"(| +$)");
                if(!reg.test(curNode.className)){
                    isOk=false;
                    break;
                }
            }
            if(isOk){
                //ary[ary.length]=curNode;
                ary[i]=curNode;
            }
        }
        return ary;
    }

    //getCss:��ȡ��ǰԪ�����о���������������ʽ(����ȫ���������)
    function getCss(curEle,attr){
        var val=null,reg=null;
        if(flag){
            val=window.getComputedStyle(curEle,null)[attr];
        }else{
            if(attr==="opacity"){
                val=curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=(.+)\)$/;
                val=reg.test(val)?reg.exec(val)[1] / 100 : 1;
            }else{
                val=curEle.currentStyle[attr];
            }
        }
        reg = /^-?(\d|([1-9]\d+))(\.\d+)?(px|em|rem|pt)$/;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    }

    //hasClass:��֤��ǰԪ�����Ƿ����className�����ʽ��
    function hasClass(curEle,className){
        var reg=new RegExp("(^| +)"+className+"( +|$)");
        return reg.test(curEle.className)
    }

    //addClass:��Ԫ��������ʽ����
    function addClass(curEle,className){
        var ary=className.replace(/(^ +| +$)/g,"").split(/ +/g);
        for(var i=0,len=ary.length;i<len;i++){
            var curName=ary[i];
            if(!hasClass(curEle,curName)){
                curEle.className+=" "+curName;
            }
        }
    }

    //removeClass:��Ԫ���Ƴ���ʽ����
    function removeClass(curEle,className){
        var ary=className.replace(/(^ +! +$)/g,"").split(/ +/g);
        for(var i=0,len=ary.length;i<len;i++){
            var curName=ary[i];
            if(this.hasClass(curEle,curName)){
                var reg=new RegExp("(^| +)"+className+"( +|$)");
                curEle.className=curEle.className.replace(reg,"")
            }
        }
    }

    //setCss:����ǰԪ�ص�ĳһ����ʽ��������ֵ��������������ʽ��
    function setCss(curEle,attr,value){
        if(attr==="float"){
            curEle["style"]["cssFloat"]=value;
            curEle["style"]["styleFloat"]=value;
            return;
        }
        if(attr==="opacity"){
            curEle["style"]["opacity"]=value;
            curEle["style"]["filter"]="alpha(opacity="+value*100+")"
            return;
        }
        var reg=/^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if(reg.test(attr)){
            if(!isNaN(value)){//�������Ч����
                value+="px";
            }
        }
        curEle["style"][attr]=value;
    }

    //setGroupCss:����ǰԪ��������������ʽ����ֵ
    function setGroupCss(curEle,options){
        options=options||0;
        if(options.toString()!=="[object Object]"){
            return;
        }
        for(var key in options){
            if(options.hasOwnProperty(key)){
                this.setCss(curEle,key,options[key])
            }
        }
    }

    //css:�˷���ʵ���˻�ȡ���������á���������Ԫ�ص���ʽֵ
    function css(curEle){
        var argTwo=arguments[1];
        if(typeof argTwo==="string"){
            if(typeof arguments[2]==="undefined"){
                return getCss.apply(this,arguments)
            }
            this.setCss.apply(this,arguments)
        }
        argTwo=argTwo||0;
        if(argTwo.toString()==="[object Object]"){
            this.setGroupCss.apply(this,arguments)
        }
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
        insertAfter:insertAfter,
        getElementsByClass:getElementsByClass,
        getCss:getCss,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css
    }

})();
