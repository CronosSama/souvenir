
import React,{useEffect, useState} from "react"
import { Typography, AppBar, Toolbar, Avatar, Button } from "@material-ui/core"
import { useSelector,useDispatch } from "react-redux"
import memorie_img from "../../img/memories.png"
import { Link, useLocation } from "react-router-dom"
import useStyle from "./style"
import { logOutUser } from "../../actions/user_action"
const Navbar = () => {

  const location = useLocation()
  // let user = null;
  const user = useSelector(({user}) => user)
  // const [userState,setUserState] = useState()
  // useEffect(()=>{
  //   console.log("changed")
  // },[location])
  const classes = useStyle()

  const dispatch = useDispatch()

  const Logout = () => {
    dispatch(logOutUser())

  }

  return (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography  component={Link} to="/" className={classes.heading} variant="h2" align="center" >Memories</Typography>
          <img className={classes.image} src={memorie_img} alt="memories"  height="60" />
        </div>

        <Toolbar className={classes.toolbar} >
          { !!Object.keys(user.user).length ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.user.username} src={user.user.image} > {user.user.image ? null : user.user.username[0]} </Avatar>
                <Typography className={classes.userName} variant="h6">{user.user.username}</Typography>
                <Button variant="contained" component={Link} to="/" onClick={Logout} className={classes.logout} color="secondary" >Logout</Button>
            </div>
          ): (
            <Button component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
          ) }

        </Toolbar>

      </AppBar> 


  )

}


export default Navbar