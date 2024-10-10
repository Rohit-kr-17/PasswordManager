import { prisma } from "../db/db"
const SignUpController = async (req:any,res:any)=>{
    const newUser=await prisma.user.create({
        data: {
          email: "newuser@eample.com",
          name: "New User",
          password:"helloworld"
        },
      });
      console.log(newUser);
    res.json(newUser)
}

export {SignUpController}