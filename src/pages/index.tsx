import Image from "next/image";
import { Formik, Form as FormikForm } from "formik";
import { loginSchema } from "@/lib/schema";
import clsx from "clsx";
import { ContentfulApiService } from "@/lib/api/contentful";
import { HrisApiService } from "@/lib/api/hris";
import { ContentfulData, FormValues } from "@/lib/interface";
import { TokenConfig } from "@/lib/custom/token";
import Input from "./components/atomic/Input";
import Loading from "./components/atomic/Loading";

export default function Home({
  contentfulData,
}: {
  contentfulData: ContentfulData | null;
}) {
  const tokenConfig = new TokenConfig();
  const classes = {
    logoSection:
      "bg-purple-800 w-full h-screen flex flex-col justify-center items-center",
    formSection:
      "bg-white w-full h-screen flex flex-col justify-center items-center",
  };

  const initialValues: FormValues = { email: "", password: "" };

  function validate(values: FormValues) {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      return result.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {} as Record<string, string>);
    }
    return {};
  }

  async function handleSubmit(values: FormValues) {
    try {
      const result = await new HrisApiService().authLogin({
        email: values.email,
        password: values.password,
      });
      if (result?.data?.access_token) {
        tokenConfig.setToken(result.data?.access_token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
        window.location.href = "admin/dashboard";
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center text-purple-700">
      <div className={clsx(classes.formSection)}>
        <Image
          alt="hris-logo"
          src="https://i.pinimg.com/736x/a7/69/c2/a769c20187fe29c6dca1c787867d333c.jpg"
          width={400}
          height={400}
          className="rounded-md mt-20"
        />
      </div>
      <div className={clsx(classes.logoSection)}>
        <div className="w-1/2 mb-10 font-semibold text-white">
          <p>{contentfulData?.items[0].fields.title}</p>
        </div>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
                disabled={isSubmitting}
              >
                Submit
              </button>
              {isSubmitting && <Loading />}
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { CONTENTFUL_ENVIRONMENT_ID, CONTENTFUL_SPACE_ID } = process.env;
  const contentfulApiService = new ContentfulApiService();

  try {
    const response = await contentfulApiService.getEntries(
      CONTENTFUL_SPACE_ID as string,
      CONTENTFUL_ENVIRONMENT_ID as string
    );
    return { props: { contentfulData: response }, revalidate: 60 };
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return { props: { contentfulData: null } };
  }
}
