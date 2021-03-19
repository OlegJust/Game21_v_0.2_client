import React, {useState} from 'react'
import {SettingNewRoom} from "./SettingNewRoom/SettingNewRoom";


export const CreatePage = () => {
    let [vkl, setVkl] = useState("off")

    const pressHandler = async () => {
        if (vkl === "off"){
            setVkl("on")
        } else  {
            setVkl("off")
        }
    }

    return (
        <div>
            <button  onClick={pressHandler}>
                создать комнату
            </button>
            <SettingNewRoom vkl={vkl}/>
        </div>
    )
}
