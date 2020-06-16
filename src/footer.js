import React, { Component } from 'react'
import './footer.css'

export default class footer extends Component {
    render() {
        const { item, Total, displayList, deleteAll, selectedBtn } = this.props;
        // const { active, all, complete };
        const active = {
            backgroundColor: selectedBtn === "active" ? "gainsboro" : "transparent",
            borderRadius: "5px"
        }
        const all = {
            backgroundColor: selectedBtn === "all" ? "gainsboro" : "transparent",
            borderRadius: "5px"
        }
        const complete = {
            backgroundColor: selectedBtn === "complete" ? "gainsboro" : "transparent",
            borderRadius: "5px"
        }
        const clrBtn = {
            display: item.length > Total.length ? "block" : "none"
        }
        if (item.length > 0) {
            return (
                <div className="footer">
                    <div style={{width:"20%"}}>
                        <p className="length">{Total.length} items left</p>
                    </div>
                    <div style={{width:"60%"}}>
                        <button className="btnDisplay" style={active} onClick={() => displayList("active")}>Active</button>
                        <button className="btnDisplay" style={all} onClick={() => displayList("all")}>All</button>
                        <button className="btnDisplay" style={complete} onClick={() => displayList("complete")}>Complete</button>
                    </div>
                    <div style={{width:"20%"}}>
                        <button className="btnClear" style={clrBtn} onClick={() => deleteAll()}>Clear Complete</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }

    }
}
