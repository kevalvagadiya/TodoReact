import React, { Component } from 'react'
import './App.css'
import List from './list'
import Footer from './footer'

export default class App extends Component {

    state = {
        items: [],
        currentItem: {
            text: "",
            key: "",
        },
        updateItem: {
            text: "",
            key: "",
        },
        allCheck: false,
        display: "all"
    }

    handleChange = (e) => {
        this.setState({
            currentItem: { text: e.target.value, key: Date.now(), isChecked: false, isDisplay: false },
        });
    }

    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem("todo"));
        if (localStorage.getItem("todo")) {
            this.setState({
                items: this.userData.items,
                currentItem: {
                    text: this.userData.currentItem.text,
                    key: this.userData.currentItem.key,
                },
            });
        }
    }

    componentWillUpdate(props, state) {
        localStorage.setItem("todo", JSON.stringify(state))
    }

    handleclick = (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem
        if (newItem.text !== "") {
            const newitem = [...this.state.items, newItem];
            let array = [];
            let Total = [];
            array = this.state.items;
            Total = this.state.items.filter((item) => !item.isChecked);
            let allCheck = false;
            if (array.length >= Total.length) {
                allCheck = false
            } else {
                allCheck = true
            }
            this.setState({
                allCheck: allCheck,
                items: newitem,
                currentItem: {
                    text: "",
                    key: "",
                },
            });
        }
    }

    handledel = (e) => {
        let arr = this.state.items;
        arr = arr.filter(item => {
            return item.key !== e;
        })
        let check = [];
        let checkAll = false;
        check = arr.filter((item) => item.isChecked)
        if (check.length > 0 && arr.length === check.length) {
            checkAll = true;
        } else {
            checkAll = false;
        }
        this.setState({ items: arr, allCheck: checkAll })
    }

    handleUpdate = (e) => {
        let arr = this.state.items;
        let tmpVal = { text: "", key: "" }
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            arr[i].text = arr[i].text.trim()
            arr[i].isDisplay = false
            if (item.key === e) {
                if (item.isDisplay === false) {
                    (arr[i].isDisplay = true)
                    tmpVal.text = item.text
                    tmpVal.key = item.key
                } else {
                    (arr[i].isDisplay = false)
                }
            }
        }
        this.setState({
            items: arr, updateItem: {
                text: tmpVal.text,
                key: tmpVal.key
            }
        })
    }
    setupdate = (e) => {
        let arr = this.state.items;
        let text = e.target.value;
        if (e.key === "Enter") {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (item.isDisplay === true) {
                    arr[i].isDisplay = false;
                    arr[i].text = text;
                }
            }
            this.setState({
                items: arr, updateItem: {
                    text: "",
                    key: ""
                }
            })
        }
        if (e.keyCode === 27) {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (item.isDisplay === true) {
                    arr[i].isDisplay = false;
                }
            }
            this.setState({ items: arr })
        }
    }

    handleFocus = (e) => {
        let arr = this.state.items;
        let text = e.target.value;

        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.isDisplay === true) {
                arr[i].isDisplay = false;
                arr[i].text = text;

            }
        }
        this.setState({ items: arr })
    }

    handleKeyPress = (text, key) => {
        // const arr = this.state.items;
        // for (let i = 0; i < arr.length; i++) {
        //     const item = arr[i];
        //     if (item.key === key) {
        //         arr[i].text = text
        //     }
        // }
        // this.setState({ items: arr })
        this.setState({
            updateItem: {
                text: text,
                key: key
            }
        })
    };
    handleCheck = (e) => {
        let arr = this.state.items;
        let check = [];
        let allCheck = false;
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.key === e) {
                if (!item.isChecked) {
                    arr[i].isChecked = true;
                } else {
                    arr[i].isChecked = false;
                }
            }
        }
        check = this.state.items.filter((item) => item.isChecked)
        if (this.state.items.length === check.length) {
            allCheck = true;
        } else {
            allCheck = false;
        }
        this.setState({ items: arr, allCheck: allCheck })
    }
    checkAll = (e) => {
        let arr = this.state.items;
        let checkVal = e.target.checked
        for (let i = 0; i < arr.length; i++) {
            if (checkVal) {
                arr[i].isChecked = checkVal;
            } else {
                arr[i].isChecked = checkVal;
            }
        }

        this.setState({ items: arr, allCheck: checkVal })
    }


    displayList = (value) => {
        this.setState({ display: value })
    }

    deleteAll = (e) => {
        let array = this.state.items
        array = array.filter(item => !item.isChecked)
        if (this.state.allCheck === true) {
            this.setState({ items: array, allCheck: false })
        } else {
            this.setState({ items: array })
        }
    }

    render() {
        let arr = this.state.items;
        let array = [];
        let Total = [];
        Total = this.state.items.filter((item) => !item.isChecked);
        let selectedBtn;
        if (this.state.display === "active") {
            selectedBtn = "active"
            array = this.state.items.filter((item) => {
                return !item.isChecked
            })
        } else if (this.state.display === "all") {
            selectedBtn = "all"
            array = this.state.items;
        } else {
            selectedBtn = "complete"
            array = this.state.items.filter((item) => {
                return item.isChecked
            })
        }

        return (
            <div className="container">
                <div>
                    <div className="todo">
                        <div>
                            <form onSubmit={this.handleclick}>
                                <p className="titleTodo">toDo</p>
                                <div className="elementTodo">
                                    <div className="forCheck">
                                        <input type="checkbox" className="mainChk" style={{ display: arr.length === 0 ? "none" : "block" }} checked={this.state.allCheck} onChange={this.checkAll} />
                                    </div >
                                    <div className="forText">
                                        <input type="textbox" className="textbx" onChange={this.handleChange} value={this.state.currentItem.text} placeholder="write here..." />   <br /><br />
                                    </div>

                                </div>
                            </form>
                        </div>
                        <table className="list" >
                            <List item={array} updateItem={this.state.updateItem} handledel={this.handledel} handleUpdate={this.handleUpdate} handleKeyPress={this.handleKeyPress} setupdate={this.setupdate} handleCheck={this.handleCheck} handleFocus={this.handleFocus} />
                        </table><br />
                        <Footer item={arr} displayList={this.displayList} deleteAll={this.deleteAll} Total={Total} selectedBtn={selectedBtn} />
                    </div>
                </div>
            </div >

        )
    }
}

