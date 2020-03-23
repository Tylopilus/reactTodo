import React from 'react';
import './App.scss';
import ListItem from './components/ListItem'


class App extends React.Component {
  state = {
    items: [],
    input: '',
    val: 0
  }

  changeHandler = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  submitHandler = (e) => {
    if (e.key === 'Enter') {

      // const newList = [...this.state.items, 
      //   {
      //     name: this.state.input,
      //     key: this.state.input + '-' + this.state.items.length,
      //     clicked: false
      //   }];
      this.setState(prev => (
        {
          items: [
            ...prev.items, 
            {
              name: prev.input,
              key: prev.input + '-' + prev.items.length
            }
          ],
          input: ''
        }
      ))
    }
  }

  updateProgress = () => {
    let cur = 0
    this.state.items.forEach(e => {
      if (e.clicked) cur++
    })

    this.setState({
      val: cur/this.state.items.length * 100
    })
  }

  clickHandler = (e) => {
    this.setState(prev => (
      {
        items: prev.items.map(el => 
          el.key === e.key ? {...el, clicked: e.clicked} : el
        )
      }
    ), () => this.updateProgress())
  }

  clearList = () => {
    this.setState({
      items: [],
      input: '',
      val: 0,
    })
    localStorage.clear();
  }

  render() {
    return (
      <div>
        <header className='App-header'>
          <progress max='100' value={this.state.val}></progress>
          <input id='todoinput' placeholder='insert todo' value={this.state.input} onChange={this.changeHandler} onKeyDown={this.submitHandler}></input>
          {this.state.items.map(item => {
            return(
              <ListItem key={item.key} itemKey={item.key} msg={item.name} onChildClick={this.clickHandler} clicked={item.clicked} />
            )
          }
          )}
          <button onClick={this.clearList}>Clear List</button>
        </header>
      </div>
    )
  }

  componentDidMount() {
    if (localStorage.getItem('todos')) { this.setState(
      JSON.parse(localStorage.getItem('todos')) 
    )}
  }


  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state))
  }
}

export default App;
