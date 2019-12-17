import React from "react"
import "./index.css"

function NavMenu() {
    return (
        <div className='NavMenu'>
            <ul>
                <li>Site 1
                    <ul>
                        <li>Subsite 1</li>
                        <li>Subsite 2</li>
                        <li>Subsite 3</li>
                    </ul>
                </li>
                <li>Site 2</li>
                <li>Site 3</li>
            </ul>
        </div>
    )
}

export default NavMenu