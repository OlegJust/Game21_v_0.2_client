import React from 'react'
//import CreatePage from "CreatePage"
import {PlayroomsPage} from "./PlayroomsPage/PlayroomsPage"
import {CreatePage} from "./CreatePage/CreatePage"

export const HomePage = () => {
  return (
    <div>
      <CreatePage />
      <PlayroomsPage />
    </div>
  )
}
