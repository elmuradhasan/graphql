import * as yup from "yup";
const signUpSchema = yup
  .object({
    password: yup.string().required("Parol boş qoyula bilməz"),
    email: yup
      .string()
      .required("Email boş qoyula bilməz")
      .email("Email formati dogru deyil"),
    username: yup.string().required("istifadeci adi boş qoyula bilməz"),
  })
  .required();

export default signUpSchema;
