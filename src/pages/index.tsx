import Image from "next/image";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { loginSchema } from "@/lib/schema";
import { ContentfulApiService } from "@/lib/api/contentful";
import { HrisApiService } from "@/lib/api/hris";
import { ContentfulData, FormValues } from "@/lib/interface";
import { TokenConfig } from "@/lib/custom/token";
import Input from "@/components/atomic/Input";
import Button from "@/components/atomic/Button";
import Loading from "@/components/atomic/Loading";

export default function Home({
  contentfulData,
}: {
  contentfulData: ContentfulData | null;
}) {
  const router = useRouter();
  const tokenConfig = new TokenConfig();
  const initialValues: FormValues = { email: "", password: "" };

  const validate = (values: FormValues) => {
    const result = loginSchema.safeParse(values);
    if (!result.success && result.error) {
      return result.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {} as Record<string, string>);
    }
    return {};
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const { data } = await new HrisApiService().authLogin(values);
      if (data?.access_token) {
        tokenConfig.setToken(data.access_token, { maxAge: 604800, path: "/" });
        router.push("admin/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-purple-700">
      <div className="bg-white w-full h-screen flex flex-col justify-center items-center">
        <Image
          alt="hris-logo"
          src="https://i.pinimg.com/736x/a7/69/c2/a769c20187fe29c6dca1c787867d333c.jpg"
          width={400}
          height={400}
          className="rounded-md mt-20"
        />
      </div>
      <div className="bg-purple-800 w-full h-screen flex flex-col justify-center items-center">
        <div className="w-1/2 mb-10 font-semibold text-white">
          {contentfulData?.items[0].fields.title}
        </div>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="rounded-md bg-white shadow-md p-10 w-1/2">
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
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                className="mt-4"
              >
                Submit
              </Button>
              {isSubmitting && <Loading />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const { CONTENTFUL_ENVIRONMENT_ID, CONTENTFUL_SPACE_ID } = process.env;
    const contentfulData = await new ContentfulApiService().getEntries(
      CONTENTFUL_SPACE_ID!,
      CONTENTFUL_ENVIRONMENT_ID!
    );
    return { props: { contentfulData }, revalidate: 60 };
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return { props: { contentfulData: null } };
  }
}
