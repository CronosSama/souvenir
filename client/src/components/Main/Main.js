import React,{useEffect, useState} from "react"
import { Grow, Container, Grid } from "@material-ui/core"
import Form from "../Form/Form"
import Donations from "../donations/donations"

import useStyles from "./style"
import { useDispatch,useSelector } from "react-redux"
import {getDonations} from "../../actions/donations_action"

const Main = () => {
  // const donations = useSelector(({donations}) =>  {return donations})
  
  const [currentId,setCurrentId] = useState(null)
  
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=>{
    //prevState
    dispatch(getDonations())

  }, [dispatch])

return (
  <Grow in>
  <Container>
    <Grid container className={classes.mainContainer} justifyContent="space-between" alignitems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}>
            <Donations currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          
            <Form currentId={currentId} setCurrentId={setCurrentId}  />
        </Grid>


    </Grid>
  </Container>

</Grow>

)


}


export default Main
