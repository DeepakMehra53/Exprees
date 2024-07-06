export const createUserValidationSchema={
    username:{
        isLength:{
            option:{
                min:5,
                max:32
            },
            errorMessage:"username must be atleast 5 characters with a max of 32 ",
        },
        notEmpty:{
            errorMessage:"Must not be empty field"
        },
        isString:{
            errorMessage:" Username must not be a String field"
        },

    },
    displayName:{
        notEmpty:{
            errorMessage:"Must not be empty field"
        },
    },
    password:{
        notEmpty:true,
    },
}