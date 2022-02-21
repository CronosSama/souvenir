import React from "react"
import useStyle from "./styles"
import { useState,useEffect } from "react";
import FileBase from "react-file-base64"
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import { createDonation, modifyDonation } from "../../actions/donations_action";
import { useDispatch, useSelector } from "react-redux"

const Form = ({currentId, setCurrentId}) => {
  const user = useSelector(({ user  }) => user)
  
  const [donationData,setDonationData] = useState({
    location : '', type_gift :'', meet_date :'' ,number_gifts :'',image_gift :'',gift : [],title : '',message :''
  })
  const dispatch = useDispatch();
  const fill_form = useSelector(({donations})=> currentId ? (donations.find((dnt)=>dnt._id == currentId)) : null)

  useEffect(()=>{
    if(currentId){
      let {location, meet_date, user,type_gift, number_gifts, image_gift, gift, title, message} = fill_form
      // var prevState = {location, meet_date, user,type_gift, number_gifts, image_gift, gift, title, message}
      setDonationData({location,type_gift, number_gifts, image_gift, gift, title, message,meet_date})
    }
  },[fill_form])


  const classes = useStyle();

  const clear_form = (e) => {

    setDonationData({
      location : '', type_gift :'', meet_date :'' ,number_gifts :'',image_gift :'',gift : [],title : '',message :''
    })
    setCurrentId(null)

  }
  const submitHandler = (e) => {

    e.preventDefault()
    console.log(user.user.username)

    if(user.isAuthenticated){
      console.log(user.user)
      let {username, _id } = user.user
      let newUser = { _id , username}
      console.log(newUser)
      if(currentId){
        const onlyChange = onlyChanged()
        
        // onlyChange["user"] = newUser
        dispatch(modifyDonation(newUser._id,fill_form._id, onlyChange))
      }
      else {
        donationData["user"] = newUser
        dispatch(createDonation(donationData))
      }
      clear_form()
    }


  }
  const changeHandler = (e) => {
    console.log(e)
    setDonationData({...donationData, [e.target.name] : e.target.value})
  }
  const onlyChanged = () => {
    var returned_data = {}
    const prevState = fill_form
    for(let key in prevState){
      if(prevState[key] === donationData[key]){
        
        continue
      }else {
        returned_data[key] = donationData[key]
      }
    }

    return returned_data
  }

  return(
    <Paper className={classes.paper}>
    {!user.isAuthenticated ? 
    (<Paper className={classes.paper} elevation={6}>
      <Typography variant="h6" align="center">
        Please Sign In to create your own memories and like other's memories.
      </Typography>
    </Paper>)
    :(
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={submitHandler} >
      <Typography variant='h6' >{currentId ? "Modify" : "Create"} a Memory</Typography>


      <TextField name='title' variant='outlined' label='title' fullWidth value={donationData.title} onChange={(e)=>setDonationData({ ...donationData,title : e.target.value })} />
      <TextField name='message' variant='outlined' label='message' fullWidth value={donationData.message} onChange={(e)=>setDonationData({...donationData,message : e.target.value})} />


      <TextField name='location' variant='outlined' label='location' fullWidth value={donationData.location} onChange={(e)=>setDonationData({...donationData,location : e.target.value})} />
      <TextField name='meet_date' type="date" variant='outlined'  fullWidth value={donationData.meet_date} onChange={(e)=>setDonationData({ ...donationData,meet_date : e.target.value })} />

      <TextField name='number' variant='outlined' label='number of gifts' fullWidth value={donationData.number_gifts} onChange={(e)=>setDonationData({ ...donationData,number_gifts : e.target.value })} />
      <TextField name='gift' variant='outlined' label='gift' fullWidth value={donationData.gift} onChange={(e)=>setDonationData({ ...donationData,gift : e.target.value.split(",") })} />
      {/* <TextField name='tags' variant='outlined' label='tags' fullWidth value={donationData.tags} onChange={(e)=>setDonationData({ ...donationData,tags : e.target.value.split(",") })} /> */}



      <div className={classes.fileInput}>
      <FileBase type='file' multiple={false}
          className={classes.fileInput}
          // onDone give us an object that contains some data and methods like (e) in input
          //one of the items in this object is base64 that contains the binary of our file
          //we destruring from it {}
          
          onDone={({base64})=>setDonationData({...donationData,image_gift : base64})}

          />
      </div>
      {/*to this style to ur button with css, you would have needed to write 100 line */}
      <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth >Submit</Button>
      <Button  variant='contained' color='secondary' size='small' onClick={clear_form} fullWidth >Clear</Button>


    </form>
    )}

  </Paper>
  )
}


export default Form