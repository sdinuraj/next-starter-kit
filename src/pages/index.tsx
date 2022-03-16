import { NextPage } from 'next'
import { FaLock } from 'react-icons/fa'
import { NextAppPageProps } from '~/types/app'
import { useAuth } from '~/lib/auth'
import Layout from '~/components/Layout'
import Auth from '~/components/Auth'
import { SpinnerFullPage } from '~/components/Spinner'

const IndexPage: NextPage<NextAppPageProps> = () => {
  const { userLoading, loggedIn } = useAuth()
  if (userLoading || loggedIn) {
    return <SpinnerFullPage />
  }

  return (
    <Layout useBackdrop={true} usePadding={false}>
      <div className="h-screen flex flex-col justify-center items-center relative">
        {/* App logo and tagline*/}
        <div className="w-full text-center mb-4 flex flex-col place-items-center">
          <div>
            <FaLock className="text-gray-600 text-5xl shadow-sm" />
          </div>
          <h3 className="text-3xl text-gray-600">
            Supa<strong>Auth</strong>&nbsp;
          </h3>
          <small>Please login to continue.</small>
        </div>
        <Auth />
      </div>
    </Layout>
  )
}

export default IndexPage

IndexPage.defaultProps = {
  meta: {
    title: 'SupaAuth - Login',
  },
}
