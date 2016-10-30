import React from 'react';
import _ from 'lodash'
import { render } from 'react-dom';
import {TodoList} from './TodoList';
import {TodoForm} from './TodoForm';

const todos = [{
    task:'abcd',
    isCompleted:false
},{
    task:'xyzw',
    isCompleted:true
}];

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos
        }
    }

    createTask(task){
        this.state.todos.push({
            task,
            isCompleted:false
        });

        this.setState({
            todos:this.state.todos
        });

    }

    toggleTask(task){
        const foundTodo = _.find(this.state.todos,todo => todo.task===task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({todos:this.state.todos})
    }

    saveTask(oldTask,newTask){
        const foundTodo = _.find(this.state.todos,todo => todo.task===oldTask);

        foundTodo.task = newTask;
        this.setState({todos:this.state.todos});
    }

    deleteTask(tastToRemove){
        _.remove(this.state.todos,todo => todo.task===tastToRemove);
        this.setState({todos:this.state.todos});
    }

    render(){
        return(
            <div>
                <h4>React Todo App</h4>
                <TodoForm todos={this.state.todos} createTodo={this.createTask.bind(this)}  />
                <TodoList todos={this.state.todos}
                          toggleTask={this.toggleTask.bind(this)}
                          saveTask={this.saveTask.bind(this)}
                          deleteTask={this.deleteTask.bind(this)} />
            </div>
        );
    }
}

render(<App/>,window.document.getElementById("app"));