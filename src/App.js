import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import Autocomplete from 'react-autocomplete';

export default connect((state) => state)(
    class App extends Component{
        constructor(prop){
            super(prop);
            this.state= {
                value: "",
                booklist: []
            };

            this.onChange = this.onChange.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.getItemValue = this.getItemValue.bind(this);
            this.renderItem = this.renderItem.bind(this);
        }

        onChange(e){
            this.setState({ value: e.target.value });
            console.log("The Input Text has changed to ", e.target.value);
        }

        onSelect(val){
            this.setState({ value: val });
            console.log("Option from 'database' selected : ", val);
        }

        renderItem(item, isHighlighted){
            return (
                <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.name}
                </div>   
            ); 
        }

        getItemValue(item){
            // You can obviously only return the Label or the component you need to show
            // In this case we are going to show the value and the label that shows in the input
            // something like "1 - Microsoft"
            return `${item.name}`;
        }
        
        componentDidMount() {
            const self = this;
            fetch('http://localhost:3001/booklist')
            .then(function(res){ return res.json() })
            .then(function(data){
                self.setState({ booklist : data })
            });

        }

        render(){
            return (
                <div>
                    <Autocomplete
                        getItemValue={this.getItemValue}
                        items={this.state.booklist}
                        renderItem={this.renderItem}
                        value={this.state.value}
                        onChange={this.onChange}
                        onSelect={this.onSelect}
                        shouldItemRender={matchStateToTerm}
                    />
                </div>
            );
        }
});

function matchStateToTerm(state, value) {
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      state.author.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }