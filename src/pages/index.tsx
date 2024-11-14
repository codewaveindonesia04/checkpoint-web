import Image from "next/image";
import { Formik, Form as FormikForm } from "formik";
import { loginSchema } from "@/lib/schema";
import clsx from "clsx";
import Input from "./components/atomic/Input";

export default function Home() {
  const classes = {
    logoSection:
      "bg-purple-800 w-full h-screen flex flex-col justify-center items-center",
    formSection:
      "bg-white w-full h-screen flex flex-col justify-center items-center",
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values: typeof initialValues) => {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const errors: any = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      return errors;
    }
    return {};
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <div className="w-full h-full flex justify-center items-center text-purple-700">
      <div className={clsx(classes.formSection)}>
        <Image
          alt="hris-logo"
          src="https://i.pinimg.com/736x/a7/69/c2/a769c20187fe29c6dca1c787867d333c.jpg"
          width={400}
          height={400}
          className="rounded-md"
        />
      </div>
      <div className={clsx(classes.logoSection)}>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <FormikForm className="rounded-md bg-white shadow-md p-10 w-1/2">
            <Input
              name="email"
              type="email"
              placeholder="Masukkan Email"
              label="Email"
            />
            <Input
              name="password"
              type="password"
              placeholder="Masukkan Password"
              label="Password"
            />
            <button
              type="submit"
              className="mt-4 font-semibold bg-purple-600 text-white p-2 w-full rounded-md hover:bg-purple-700"
            >
              Submit
            </button>
          </FormikForm>
        </Formik>
      </div>
    </div>
  );
}
