import React from 'react';
import ToDoList from './Components/Todo';
import './Components/style.css';
import ImageAll from './Image/all.svg';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
          item : JSON.parse(localStorage.getItem('item')) || localStorage.setItem('item','[]'),
          value : "",
          number : JSON.parse(localStorage.getItem('item')).filter(item => item.isComplete == false).length
        }
        this.keyup = this.keyup.bind(this);
        this.change = this.change.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.all = this.all.bind(this);
        this.active = this.active.bind(this);
        this.completed = this.completed.bind(this);
        this.ref = React.createRef();
        
        
    }
  
    componentDidMount(){
      this.ref.current.focus();
    }

    checkAll(){
      var list = [...this.state.item];
      var checkTrue = list.filter(item => item.isComplete == true)
      if(checkTrue.length < list.length ){
        list.map(item => {
          item.isComplete = true
        })
      }
      else if(checkTrue.length == list.length){
        list.map(item => {
          item.isComplete = false
        })
      }
      this.setState({
        item : [
          ...list
        ]
      }, () => {
        localStorage.setItem('item', JSON.stringify(this.state.item));
        var result = (this.state.item).filter(item => item.isComplete == false)
        this.setState({
         number : result.length
        })
    })
    }

    click(itemClick){
      return () => {
        var {item} = this.state;
        var complete = !itemClick.isComplete;
        var index = item.indexOf(itemClick);
        this.setState({
          item : [
            ...item.slice(0, index),
            {
              ...itemClick, isComplete : complete
            },
            ...item.slice(index + 1)
          ]
        }, () => {
          localStorage.setItem('item', JSON.stringify(this.state.item));
          var result = (this.state.item).filter(item => item.isComplete == false)
          this.setState({
           number : result.length
          })
      })
      }
    }

    

    deleteItem(itemClick){
      return () => {
        var {item} = this.state;
        var index = item.indexOf(itemClick);
        this.setState({
          item : [
            ...item.slice(0, index),
            ...item.slice(index + 1)
          ]
        }, () => {
          localStorage.setItem('item', JSON.stringify(this.state.item));
          var result = (this.state.item).filter(item => item.isComplete == false)
          this.setState({
           number : result.length
          })
      })}
    }

    keyup(event){
      let text = event.target.value;
      if(!text){
        return;
      }
      text = text.trim();
      if(!text){
        return;
      }
      if(event.keyCode === 13){
        this.setState({
          item : [
            {title : text, isComplete : false}
            ,...this.state.item
          ]
          ,value : ""
        },() => {
          localStorage.setItem('item', JSON.stringify(this.state.item));
          this.setState({
           number : this.state.item.length
          })
        })
      
    }}

    change(event){
      this.setState({value : event.target.value})
    }

    clearAll(){
      let item = JSON.parse(localStorage.getItem('item'));
      var checkFalse = item.filter(item => item.isComplete == false)
      this.setState({
        item : [
          ...checkFalse
        ]
      }, () => {
        localStorage.setItem('item', JSON.stringify(this.state.item));
        var result = (this.state.item).filter(item => item.isComplete == false)
        this.setState({
         number : result.length
        })
      })
    }
    
    all(){
      this.setState({
        item : [
          ...JSON.parse(localStorage.getItem('item'))
        ]
      })
    }

    active(){
      var checkFalse = JSON.parse(localStorage.getItem('item')).filter(item => item.isComplete == false)
      this.setState({
        item : [
          ...checkFalse
        ]
      })
    }

    completed(){
      var checkTrue = JSON.parse(localStorage.getItem('item')).filter(item => item.isComplete == true)
      this.setState({
        item : [
          ...checkTrue
        ]
      })
    }
    
    render(){
        let {item, value} = this.state;
        let numberItem = JSON.parse(localStorage.getItem('item')).length;
        return (
        <div className="item">
          <h1>todos</h1>
          <div id="input" >
            <div id="img-input">
              <img id="imgAll" src={ImageAll} onClick={this.checkAll}></img>
              <input id="input-text" 
                placeholder="What needs to be done?" 
                onKeyUp={this.keyup} 
                onChange={this.change}
                value={value} 
                ref={this.ref}>
              </input>
            </div>  
            {
              item.map((item,index) => 
                <ToDoList key={index} 
                          item={item} 
                          click={this.click(item)}
                          deleteItem={this.deleteItem(item)}/>)
            }
            {
              numberItem > 0 && <footer>
                  <p>{this.state.number} item left</p>
                  <div>
                    <a href="#" onClick={this.all}>All</a>
                    <a href="#" onClick={this.active}>Active</a>
                    <a href="#" onClick={this.completed}>Completed</a>
                  </div>
                  <button id="clear-completed" onClick={this.clearAll}>Clear completed</button>
                </footer>
              
            }
            
          </div>
        </div>       
        );
    }
    
}

export default App;
