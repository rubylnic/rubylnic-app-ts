import * as yup from "yup";

const schema = {
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, "First name should not contain numbers")
        .required("First name is a required field"),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
        .required("Last name is a required field"),
    email: yup
        .string()
        .email("Should have email format")
        .required("E-mail is a required field"),
    radio: yup.string().required("A radio option is required"),
    checkboxGroup: yup.array().required(
        "At least one checkbox is required"
    ),
    singleCheckbox: yup.bool().oneOf([true], "Must agree to something")
};


export function createSchema(...args) {
    const rules = {};
    args.map(item =>
        rules[item] = schema[item]
    );
    console.log(rules)

    return yup.object().shape({
        ...rules
    });
}

