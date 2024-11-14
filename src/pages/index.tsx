import Image from "next/image";
import { Formik, Form as FormikForm } from "formik";
import { loginSchema } from "@/lib/schema";
import clsx from "clsx";

import { ContentfulApiService } from "@/lib/api/contentful";
import { HrisApiService } from "@/lib/api/hris";
import { LoginState } from "@/lib/interface";

import Input from "./components/atomic/Input";

interface ContentfulData {
  items: any[];
}

interface FormValues {
  email: string;
  password: string;
}

export default function Home({
  contentfulData,
}: {
  contentfulData: ContentfulData | null;
}) {
  const classes = {
    logoSection:
      "bg-purple-800 w-full h-screen flex flex-col justify-center items-center",
    formSection:
      "bg-white w-full h-screen flex flex-col justify-center items-center",
  };

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  function validate(values: FormValues) {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      return errors;
    }
    return {};
  }

  async function handleSubmit(values: FormValues) {
    const hrisApiService = new HrisApiService();
    const data: LoginState = {
      email: values.email,
      password: values.password,
    };
    try {
      const result = await hrisApiService.authLogin(data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center text-purple-700">
      <div className={clsx(classes.formSection)}>
        <div className="mt-20">
          <Image
            alt="hris-logo"
            src="https://i.pinimg.com/736x/a7/69/c2/a769c20187fe29c6dca1c787867d333c.jpg"
            width={400}
            height={400}
            className="rounded-md"
          />
        </div>
      </div>
      <div className={clsx(classes.logoSection)}>
        <div className="w-1/2 mb-10">
          <p className="font-semibold text-white">
            {contentfulData?.items[0].fields.title}
          </p>
        </div>
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

export async function getStaticProps() {
  const contentfulApiService = new ContentfulApiService();
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID as string;
  const spaceId = process.env.CONTENTFUL_SPACE_ID as string;
  const assetId = process.env.CONTENTFUL_LOGO_MYHRIS_ID as string;

  try {
    const response = await contentfulApiService.getEntries(
      spaceId,
      environmentId
    );
    const contentfulData: ContentfulData = response;
    return {
      props: {
        contentfulData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return {
      props: {
        contentfulData: null,
      },
    };
  }
}
