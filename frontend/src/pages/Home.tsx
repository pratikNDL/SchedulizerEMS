import PageWrapper from "../components/Wrappers/PageWrapper";
import useFetchMe from "../hooks/useFetchMe"

function Home() {
  useFetchMe();
  return (
    <>
      <PageWrapper>
        {}
      </PageWrapper>
    </>

  )
}

export default Home