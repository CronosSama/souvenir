import * as actionType from "../actions/actionType"

const  post_reducer = (donations = [], action) => {
  switch (action.type) {
    case actionType.GET_ALL_DONATIONS :
      donations = action.data
      return donations
  
    case actionType.CREATE_DONATION :
      donations = [...donations, action.data]
      return donations

    case actionType.MODIFY_DONATION :
      donations = donations.filter((dnt)=> dnt._id !== action.data._id )
      donations = [...donations, action.data]
      return donations

    case actionType.DELETE_DONATION :
      donations = donations.filter((dnt)=> dnt._id !== action.data._id )
      return donations

    default:
      return donations
  }


}

export default post_reducer




