import { GetServerSideProps } from 'next'
import { useAuthWithRedir, ProtectedRoute } from '~/lib/auth'
import Layout from '~/components/Layout'
import { SpinnerFullPage } from '~/components/Spinner'

export const getServerSideProps: GetServerSideProps = (context) =>
  ProtectedRoute({
    context,
    getPropsFunc: async (options) => {
      return {
        more: 'data',
      }
    },
  })

const HomePage = (props) => {
  const { user, userLoading, signOut, loggedIn } = useAuthWithRedir()
  if (userLoading || !loggedIn) {
    return <SpinnerFullPage />
  }

  return (
    <Layout useBackdrop={false}>
      <div className="h-screen flex flex-col justify-center items-center relative">
        <h2 className="text-3xl my-4">
          Howdie, {user && user.email ? user.email : 'Explorer'}!
        </h2>
        <div>
          <button
            onClick={signOut}
            className="btn btn-outline btn-secondary btn-wide"
          >
            Sign Out
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage

HomePage.defaultProps = {
  meta: {
    title: 'SupaAuth - Home',
  },
}
