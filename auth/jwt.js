require("dotenv").config()
const jwt = require("jsonwebtoken")
const db = require("../database/db")



// Access Token

CreatAccessToken = (usertoken)=>{


    return jwt.sign({usertoken},"2b55fa4797076946acd9c8dafd5b4b831b2991404be2a1d4cbdf61e56475468689d84604e5ec44679a5c58106dcfc3f83296",{
           expiresIn:'60m'

    })

}


// Refresh Token

CreateRefreshToken = (usertoken)=>{

    return jwt.sign({usertoken},"de4160a3cdbbc90e01abc95018aa9387617e390501075c109929aa6ba907ab0dcaaab988cba596d7be2dadc93b9c5c41fecf",{
          expiresIn:"4m"
     })

}



// Authenticate 

authenticator = (req,res,next)=>{

    // Grab header

   const autherHeader =  req.headers["authorization"]
   const token = autherHeader && autherHeader.split(" ")[1]

   // check if token exist

   if(token === null) return res.sendStatus(401)

 
     jwt.verify(token,"2b55fa4797076946acd9c8dafd5b4b831b2991404be2a1d4cbdf61e56475468689d84604e5ec44679a5c58106dcfc3f83296",(err,user)=>{

                  if(err) {
                    console.log(err.message)
                    res.sendStatus(403)
                    return
                  }

                  req.user = user
                  next()

     })

}



UpdateJwtRefreshToken = (token,refreshToken) =>{
  
    
  const sql = "UPDATE jwt SET jwt = ? WHERE token = ?;"
 
       db.query(sql,[refreshToken,token],(err,result)=>{
            
          if(err) return console.log(err)
        //   console.log(result)
          console.log(" jwt updated...")

       })
  

}


 GetRefreshTokens =  (req,res)=>{
     
  const cookies = req.cookies

  if(!cookies?.clienttokens) return res.sendStatus(401)

  const clienttokens = cookies.clienttokens
     // console.log(refreshtokens)
  const sql = "SELECT * FROM jwt;"


  db.query(sql,async (err,result) =>{
        
       if(err) return console.log(err)

        const Alltokens = result
        // console.log(Alltokens)
        const FoundToken = await Alltokens.find(token => token.jwt === clienttokens)

         //  console.log(FoundToken)

         if(!FoundToken) {
             res.sendStatus(204)
             console.log('Token Not found')
             return 
         }else{

               let sql = "SELECT token FROM jwt WHERE jwt = ?"

                db.query(sql,[FoundToken.jwt],(err,result) =>{

                    if(err) console.log(err)

                     const token = result[0].token
                     
                    jwt.verify(FoundToken.jwt,process.env.REFRESH_TOKEN_SECRETE,(err,user) =>{
                           if (err) return res.sendStatus(403)

                           const accesstoken = CreatAccessToken({token})
                           res.json({
                            accessToken:  accesstoken,
                            Usertoken:  token,
                            status: true
                          })
                     }) 

                   
                })

         }
  }) 

}

const Logout = (req,res)=>{
     
  const cookies = req.cookies;

  // Check if refreshtokens cookie exists in request
  if (!cookies?.refreshtokens) {
    return res.sendStatus(401); // Unauthorized if cookie is not present
  }

  const refreshtokens = cookies.refreshtokens;

  // Query the database to find the refresh token
  const sql = "SELECT * FROM jwt;";
  db.query(sql, async (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500); // Internal Server Error if database query fails
    }

    const refreshTokens = result;
    const foundToken = refreshTokens.find((token) => token.jwt === refreshtokens);

    if (!foundToken) {
      // If refresh token not found in database, return 401
      console.log('Token Not found');
      return res.sendStatus(401);
    }

    // Update the token in the database (set it to "")
    const updateSql = "UPDATE jwt SET jwt = ? WHERE jwt = ?;";
    db.query(updateSql, ["", foundToken.jwt], (err, result) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500); // Internal Server Error if database update fails
      }

      console.log('Cookie cleared');
      // Clear the cookie in the response
      res.clearCookie('refreshtokens', {
        httpOnly: false,
        secure: false,
        sameSite: 'none',
        maxAge: 0
      }).sendStatus(204); // Send 204 No Content after clearing cookie
    });
  });

}




module.exports = {CreatAccessToken,CreateRefreshToken,authenticator,UpdateJwtRefreshToken,GetRefreshTokens}