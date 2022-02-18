import React from "react"
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core"

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from "moment"
import useStyles from "./styles.js"
import { useDispatch } from "react-redux";
import { deleteDonation } from "../../../actions/donations_action.js";

const Donation = ({user, donation, setCurrentId, currentId}) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  return(
    <Card className={classes.card} >
      <CardMedia className={classes.media} image={donation.image_gift} title={donation.title} />
      <div className={classes.overlay} >
        <Typography variant="h6" >{donation.user.username}</Typography>
        <Typography variant="body2" >{moment(donation.CreatedAt).fromNow()}</Typography>
      </div>

      {user.isAuthenticated && user.user._id == donation.user._id && (
          <div className={classes.overlay2}>
          <Button style={{color:'white'}} size="small" onClick={()=> {setCurrentId(donation._id)}} >
            <MoreHorizIcon fontSize="medium" />
          </Button>
      </div>
      )}

      <div className={classes.details} >
        <Typography variant="body2" color="textSecondary" >#{donation.gift.map((gift_)=> `${gift_} `)}</Typography>
      </div>

      <Typography variant="h6" className={classes.title} gutterBottom >{donation.title}</Typography>

      <CardContent>
        <Typography variant="body2"  color="textSecondary" component="p" >{donation.message}</Typography>

      </CardContent>

      <CardActions className={classes.cardActions}>
        {/* <Button size="small" color="primary" onClick={()=>{}} >
          <ThumbUpAltIcon fontSize="small" />
          Like
          {donation.likeCount}
        </Button>
         */}
         &nbsp;
        {user.isAuthenticated && user.user._id == donation.user._id && (
            <Button size="small" color="primary" onClick={()=> {dispatch(deleteDonation(user.user._id,donation._id))}} >
            <DeleteIcon fontSize="small" />
            Delete
            </Button>
        )}
        

      </CardActions>
    </Card>

  );
}


export default Donation