import bcrypt from 'bcrypt'
const saltRound =10;
export const hashPassword =(password)=>{
    const salt=bcrypt.genSaltSync(saltRound)
    console.log(salt)
    return bcrypt.hashSync(password,salt)
    
};
export const camparePassword=(plain,hashed) => bcrypt.compareSync(plain,hashed)
