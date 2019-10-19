import React, { Component } from 'react'
import TodoInput from './TodoInput'
import Todoing from './Todoing'

if(localStorage.getItem('todo')==null){
    let list = [];
    localStorage.setItem('todo',JSON.stringify(list));
}
//全部变量，获取所有localStorage
function getTodoList(){
    var todolist = [];
    let ls = localStorage.getItem('todo');
    if(ls != null){
        ls = JSON.parse(ls);
        for(var i=0;i<ls.length;i++){
            if(ls[i].done == 'false'){
                todolist.push(ls[i].title);
            }
        }
    }
    //console.log(list);
    return todolist;
}
//getTodoList();
function getFinishList(){
    var finishList = [];
    let ls = localStorage.getItem('todo');
    if(ls != null){
        ls = JSON.parse(ls);
        for(var i=0;i<ls.length;i++){
            if(ls[i].done == 'true'){
                finishList.push(ls[i].title);
            }
        }
    }
    return finishList;
}
function getlocalStorage(){
    let ls = localStorage.getItem('todo');
    ls = JSON.parse(ls);
    return ls;
}
export default class TodoList extends Component {
    constructor(){
        super();
        this.state = {
            todo : [1,2,3],
            finish : [],
            todoListLength : 0,
            finishListLength : 0
        }
    }
    componentDidMount(){
        let todolist = getTodoList();
        //console.log("todolis："+todolist);
        let finishList = getFinishList();
        //console.log("finish："+finishList);
        this.setState({
            todo : todolist,
            finish : finishList,
            todoListLength : todolist.length,
            finishListLength : finishList.length
        })
    }
    addItem=(data)=>{
        let list = getlocalStorage();
        list.unshift(data);
        localStorage.setItem('todo',JSON.stringify(list));
        this.componentDidMount();
    }
    delItem=(data)=>{
        var index = data;
        let ls = getlocalStorage();
        ls.splice(index,1);
        //console.log(ls);
        localStorage.setItem('todo',JSON.stringify(ls));
        this.componentDidMount();
    }
    //todo转finish
    setFinish=(data,index)=>{
        //console.log(data,index);
        let ls = getlocalStorage();
        ls[index].done = 'true';
        localStorage.setItem('todo',JSON.stringify(ls));
        this.componentDidMount();
    }
    //finish转为todo
    setTodo=(data,index)=>{
        //console.log(data,index);
        let ls = getlocalStorage();
        ls[index].done = 'false';
        localStorage.setItem('todo',JSON.stringify(ls));
        this.componentDidMount();
    }
    render() {
        return (
            <div>
                <TodoInput add={this.addItem} />
                <Todoing todo={this.state.todo} finish={this.state.finish} 
                         todoLength={this.state.todoListLength} finishLength={this.state.finishListLength}
                    del={this.delItem}  check={this.setFinish}   checkFinish={this.setTodo} />
            </div>
        )
    }
}
