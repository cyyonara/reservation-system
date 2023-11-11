import * as yup from "yup";

export const createServiceFormSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  price: yup.number().moreThan(0, "Invalid price").required("This field is required"),
});
