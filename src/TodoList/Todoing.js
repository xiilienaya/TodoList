import React, { Component } from 'react'
import './todo.css'
import $ from 'jquery'

function getIndex(title){
    var index;
    let ls = localStorage.getItem('todo');
    ls = JSON.parse(ls);
    for(var i=0;i<ls.length;i++){
        if(ls[i].title == title){
            //console.log(ls[i]);
            index = i;
        }
    }
    return index;
}

export default class Todoing extends Component {
    del(item){
        //console.log(item);
        var index = getIndex(item.item);
        this.props.del(index);
    }
    check=(e,item)=>{
        var checked = e.target.checked;
        if(checked == true){
            var index = getIndex(item.item);
            this.props.check(item,index);
            //处理bug
            var list = $(':checkbox');
            var idx;
            for(var i =0;i<list.length;i++){
                if(list[i].value == item.item && i != list.length-1){
                    idx = i;
                    $(':checkbox')[idx].checked = false;
                }
            }
            
        }
        if(checked == false){
            var index = getIndex(item.item);
            this.props.checkFinish(item,index);
        }
    }
    render() {
        var {todo} = this.props;
        var {finish} = this.props;
        var {todoLength} = this.props;
        var {finishLength} = this.props;
        //console.log(todoLength,finishLength);
        //console.log(todo);
        return (
            <div id="main">
                <p style={{paddingTop:'5px'}}>正在进行<span id="sp">待办项：{todoLength}</span></p>
                <ul id="add-ul">
                    {
                        todo.map((item,index)=>{
                        return <li key={index}>
                                <input type="checkbox" value={item} onChange={(e)=>{this.check(e,{item})}} />
                                {item}
                                <button onClick={()=>{this.del({item})}}>删除</button>
                            </li>
                        })
                    }
                </ul>
                <p>已经完成<span id="sp">已完成：{finishLength}</span></p>
                <ul id="del-ul">
                    {
                        finish.map((item,index)=>{
                            return <li key={index}>
                                <input type="checkbox" value={item} checked="checked" onChange={(e)=>{this.check(e,{item})}} />
                                {item}
                                <button onClick={()=>{this.del({item})}}>删除</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
