import React from "react"
import Donation from "./donation/donation"
import useStyles from "./styles"
import {CircularProgress, Grid} from "@material-ui/core"
import { useSelector } from 'react-redux'
const Donations = ({currentId, setCurrentId}) => {
  const classes = useStyles()
  //must be the same name in combine reducer
  const donations = useSelector((state)=>state.donations)
  const user = useSelector(({user})=> user)
  console.log("this is donationS")
  console.log(donations)

  return(
    !donations.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3} >
        {donations.map((dnt)=> (
          
            <Grid key={dnt._id} item xs={12} sm={6}>
                  <Donation user={user} donation={dnt} currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
        ))}

      </Grid>

    )


  );
}


export default Donations