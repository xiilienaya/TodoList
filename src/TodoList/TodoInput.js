import React, { Component } from 'react'
import './todo.css'
import $ from 'jquery'

export default class TodoInput extends Component {
    add=(e)=>{
        var value = e.target.value;
        if(e.keyCode === 13){
            if(value != ""){
                var data = {title:value,done:'false'};
                this.props.add(data);
                $('#getValue').val("");
            }else{
                alert("内容不能为空");
            }
        }
    }
    render() {
        return (
            <div id="top">
                <span id="title">TodoList</span>
                <input type="text" onKeyDown={this.add} id="getValue" placeholder="添加Todo" />
            </div>
        )
    }
}
