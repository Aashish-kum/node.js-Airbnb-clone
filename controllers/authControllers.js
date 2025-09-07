const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


exports.getLogin = (req, res, next) => {
    // const userType = req.session.user ? req.session.user.userType : null;
    // console.log("userType:", userType);

    res.render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        errors: [],
        isloggedIn: req.session.isloggedIn || false,
        oldInput: { email: "" },
        user: {},
        // user: req.session.user || {},
    });
};


exports.getSignUp = (req, res, next) => {
    res.render("auth/signUp", {
        pageTitle: "Sign Up",
        currentPage: "signup",
        isloggedIn: false,
        errors: [],
        oldInput: { fullname: "", email: "", password: "", userType: "" },
        user: {},
    
    });
}

exports.postSignUp = [


    check("fullname")
        .notEmpty()
        .withMessage("Name is required")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("Name must contain only letters and spaces"),


    check("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),


    check("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain at least one special character")
        .trim(),


    check("confirmPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),


    check("userType")
        .notEmpty()
        .withMessage("Please select a user type")
        .isIn(['guest', 'host'])
        .withMessage("Invalid user type"),

    check("terms")
        .notEmpty()
        // .withMessage("You must accept the terms and conditions")
        .custom((value, { req }) => {
            if (value !== 'on') {
                throw new Error("You must accept the terms and conditions");
            }
            return true;
        }),



    (req, res, next) => {
        console.log(req.body);
        const { fullname, email, password, userType } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render("auth/signUp", {
                pageTitle: "Sign Up",
                currentPage: "signup",
                isloggedIn: false,
                errors: errors.array().map(err => err.msg),
                oldInput: { fullname, email, password, userType },
                user: {},
            });
        }


        bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({ fullname, email, password: hashedPassword, userType });
            return user.save();
        }).then(() => {
            res.redirect("/login");
        }).catch(err => {
            return res.status(422).render("auth/signUp", {
                pageTitle: "Sign Up",
                currentPage: "signup",
                isloggedIn: false,
                errors: [err.message],
                oldInput: { fullname, email, password, userType },
                user: {},
            });
        })

    }
]


exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(422).render("auth/login", {
            pageTitle: "Login",
            currentPage: "login",
            isloggedIn: false,
            errors: ["User dose not Exist"],
            oldInput: { email },
            user: {},
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(422).render("auth/login", {
            pageTitle: "Login",
            currentPage: "login",
            isloggedIn: false,
            errors: ["Invalid Password"],
            oldInput: { email },
            user: {},
        });
    }

    req.session.isloggedIn = true;
    req.session.user = user;
    await req.session.save();
    res.redirect("/");
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/login");
        //req.isloggedIn = false;
    });

}

