import * as yup from "yup";
const ContactSchema = yup.object().shape({
  name: yup.string().required('Zəhmət olmasa adınızı qeyd edin'),
  email: yup.string().required('Zəhmət olmasa emailinizi qeyd edin').email('Email formatı düzgün deyil'),
  message: yup.string().required('Zəhmət olmasa mesajınızı yazın'),
});
export default ContactSchema;