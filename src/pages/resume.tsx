import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "https://ggl.link/resume", 
      permanent: false,
    },
  };
};

// This component never actually renders, because we redirect above.
//  next requires a default export.
export default function ResumeRedirect() {
  return null;
}
