import React from 'react';

export class TodoForm extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            error:null
        }
    }

    renderError(){
        if(!this.state.error){
            return null;
        }
        else{
            return <div style={{color:'red'}}>{this.state.error}</div>;
        }

    }

    handleCreate(event){
        event.preventDefault();
        //console.log(this.refs.addInput.value);
        //console.log(this.props.createTodo);
        const addInput = this.refs.addInput;
        const task = addInput.value;
        const validateInput = this.validateInput(task)

        if(validateInput){
            this.setState({error:validateInput});
            return;
        }
        this.setState({error:null});
        this.props.createTodo(task);
        this.refs.addInput.value = '';
    }

    validateInput(task){
        if(!task){
            return 'Please enter a task';
        }else if(_.find(this.props.todos,todo=>todo.task===task)){
            return 'Task already exists!';
        }else{
            return null;
        }
    }

    render(){
        return(
           <form onSubmit={this.handleCreate.bind(this)}>
               <input type="text" placeholder="add todos" ref="addInput" />
               <button type="submit">Add todo</button>
               {this.renderError()}
           </form>
        );
    }
}
