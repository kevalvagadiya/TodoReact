import React, { Component } from 'react'
import './list.css'

export default class list extends Component {



    render() {
        const { item, updateItem, handledel, handleUpdate, handleKeyPress, setupdate, handleCheck, handleFocus } = this.props

        const list = item.map((i) => {

            const isChecked = {
                textDecoration: i.isChecked ? "line-through" : "none",
                display: i.isDisplay ? "none" : "block",
                opacity: i.isChecked ? "0.5" : "1"
            };
            const isDisplay = {
                display: i.isDisplay ? "block" : "none"
            };

            return (
                <tr className="listTr" key={i.key} >
                    <td className="smallTd"><input className="chkbx" type="checkbox" checked={i.isChecked} onChange={() => handleCheck(i.key)} /></td>
                    <td className="bigTd" onDoubleClick={() => handleUpdate(i.key)} >
                        <p style={isChecked} className="listOut" >{i.text.trim()} </p>

                        <input type="textbox" id={"txt" + i.key} className="txtUpdate" value={updateItem.text} onChange={(e) => {
                            handleKeyPress(e.target.value, i.key);
                        }} style={isDisplay} onKeyDown={setupdate} onBlur={handleFocus} />

                    </td>
                    <td className="smallTd" ><p className="del" onClick={() => handledel(i.key)} >X</p ></td>
                </tr>
            )

        });

        return (
            <tbody className="maindiv">{list}</tbody>
        )
    }
}
