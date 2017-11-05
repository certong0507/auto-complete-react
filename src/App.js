import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import Autocomplete from 'react-autocomplete';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default connect((state) => state)(
    class App extends Component{
        constructor(prop){
            super(prop);
            this.state= {
                value: '',
                autor: '',
                bookname: '',
                booklist: []
            };

            this.onChange = this.onChange.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.getItemValue = this.getItemValue.bind(this);
            this.renderItem = this.renderItem.bind(this);
            this.clearSearch = this.clearSearch.bind(this);
        }

        onChange(e){
            this.setState({ value: e.target.value });
            console.log("The Input Text has changed to ", e.target.value);
        }

        onSelect(val){
            this.setState({ value: val, author: val.split('-')[0], bookname: val.split('-')[1]});
            console.log("Option from 'database' selected : ", val);
        }

        renderItem(item, isHighlighted){
            return (
                <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.author} - {item.name}
                </div>   
            ); 
        }

        getItemValue(item){
            return `${item.author}` + ' - ' + `${item.name}`;
        }
        
        clearSearch(e){
            return (
                this.setState({ value: '', author: '', bookname: '' })
            )
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
                    <h3 style={{padding: '20px 0px 0px 20px'}}>Search by author/book name : </h3>
                    <Autocomplete
                        getItemValue={this.getItemValue}
                        items={this.state.booklist}
                        renderItem={this.renderItem}
                        value={this.state.value}
                        onChange={this.onChange}
                        onSelect={this.onSelect}
                        shouldItemRender={matchStateToTerm}
                    />
                    <div className="card" style={{width: '20rem', marginLeft: '20px'}}>
                        <div className="card-body">
                            <h4 className="card-title">Aauthor and Book</h4>
                            <div className="card-text">
                                <div>
                                    <span style={{paddingRight: '10px'}}>Author :</span>
                                    <span className="text-muted">{this.state.author}</span>
                                </div>
                                <div>
                                    <span style={{paddingRight: '10px'}}>Book :</span>
                                    <span className="text-muted">{this.state.bookname}</span>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.clearSearch}>Clear</button>
                    </div>
                </div>
            );
        }
});

function matchStateToTerm(state, value) {
    return (
      state.author.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }