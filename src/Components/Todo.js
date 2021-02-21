import React from 'react';
import './style.css';
import deleteIcon from '../Image/delete.svg'

class ToDoList extends React.Component{
    render(){
        let className = 'todoItem';
        let {click, item, deleteItem} = this.props;
        var checked = '';
        if(item.isComplete){
            className += ' todo-complete';
            checked = 'checked'
        }
        return (
            <div className="click">
                <div id='group-checkbox'>
                    <input type="checkbox" onChange={click} checked={checked}></input>
                    <p className={className}>{item.title}</p>
                </div>
                <img id="delete-icon" src={deleteIcon} onClick={deleteItem}></img>
            </div>
            
        );
    }
    
}

export default ToDoList;