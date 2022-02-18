import crypto from "crypto"
import util from "util"
//so that the method inside crypto will return a promise
const scrypto = util.promisify(crypto.scrypt)


export const hashing = async(input_password)=> {
  try {
    //we generating random bytes and then converting the bytes to string of hexadecimal characters
    const salt = crypto.randomBytes(8).toString("hex")
    const password = await scrypto(input_password,salt,64).then(hashed=>hashed.toString("hex"))
    return { salt, password }
  } catch (error) {
    return next(error)
  }

}

export const compare = async(input_password,salt,origin_hashed_password) => {
  try {
    const hashed_password = await scrypto(input_password,salt,64).then(hashed=>hashed.toString("hex"))
    const isMatch = hashed_password === origin_hashed_password
    return isMatch
    
    
  } catch (error) {
    return next(error)
  }
}
