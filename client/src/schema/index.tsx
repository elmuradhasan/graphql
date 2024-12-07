import * as yup from "yup";
const schema = yup
  .object({
    name: yup.string().required("Ad boş qoyula bilməz"),
    email: yup
      .string()
      .required("Email boş qoyula bilməz")
      .email("Email formati dogru deyil"),
  })
  .required();

export default schema;
