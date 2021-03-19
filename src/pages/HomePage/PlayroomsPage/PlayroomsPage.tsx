import React, {useEffect, useCallback, useState, useContext} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {Loader} from '../../../components/Loader'
import {Navbar} from "./Navbar/Navbar";
import {AuthContext} from "../../../context/AuthContext";
import classes from "./PlayroomsPage.module.css"
import socket from "../../../core/socket"


export const PlayroomsPage = () => {
    const [playrooms, setPlayrooms] = useState({})
    const [userPlayroom, setUserPlayroom] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/playrooms', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setPlayrooms(fetched)
						console.log(fetched)
        } catch (e) {
					console.error(e)
        }
    }, [token, request])
    useEffect(() => {
        socket.on('new playroom', (data:any) => {
					
          setPlayrooms({...playrooms, [data.roomId]: data.users})
          
        })

        socket.on('get userPlayroom', (data:any) => {
            setUserPlayroom(data)
        })
    }, [playrooms])
    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className={classes.flex}>
            <div className={classes.content}>
                {!loading && <Navbar playrooms={playrooms} userPlayroom={userPlayroom} />}
            </div>
        </div>
    )
}
