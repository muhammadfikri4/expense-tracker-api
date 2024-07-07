export const MESSAGES = {
    CREATED: {
        USER: {
            ACCOUNT: "User created successfully"
        },
        CATEGORY: "Category created successfully"
    },
    ERROR: {
        NOT_FOUND: {
            USER: {
                ACCOUNT: "User not found",
                EMAIL: "Email is required",
                PASSWORD: "Password is required",
                NAME: "Name is required"
            },
            CATEGORY: "Category not found",
            USER_ID: "User id not found"

        },
        INTERNAL_SERVER: "Internal Server Error",
        ALREADY: {
            USER: {
                ACCOUNT: "User already exist"
            }
        },
        INVALID: {
            USER: {
                PASSWORD: "Password is wrong",
                PASSWORD_LENGTH: "Password must be at least 8 characters",
                EMAIL: "Email is invalid",
                GENDER: 'Gender is invalid'
            },
            AUTH: "Invalid credentials token"
        },
        UNAUTHORIZED: {
            AUTH: "If you are not logged in, please log in first",
            FORBIDDEN: "You are not Authorized"
        },
        REQUIRED: {
            NAME: "Name is required",
            EMAIL: "Email is required",
            PASSWORD: "Password is required",
            USER_ID: "User id is required"

        }
    },
    SUCCESS: {
        USER: "User logged in successfully",
        CATEGORY: {
            GET: "Category fetched successfully"
        }
    }
}