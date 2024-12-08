import * as yup from "yup";
const schema = yup
  .object({
    password: yup.string().required("Parol boş qoyula bilməz"),
    email: yup
      .string()
      .required("Email boş qoyula bilməz")
      .email("Email formati dogru deyil"),
  })
  .required();

export default schema;
