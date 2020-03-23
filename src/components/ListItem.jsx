import React from 'react'
import './ListItem.scss'

class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {
                key: props.itemKey,
                msg: props.msg,
                clicked: props.clicked 
            },
        }
    }

    clickHandler = (e) => {
        this.setState(prev => (
            {
                item: {
                    ...prev.item, 
                    clicked: !prev.item.clicked
                }
            }), () => this.props.onChildClick(this.state.item)
        )
    }

    render(){
        return(
            <div onClick={this.clickHandler} className={this.state.item.clicked ? 'done': ''}>{this.state.item.msg}</div>
        )
    }
}

export default ListItem