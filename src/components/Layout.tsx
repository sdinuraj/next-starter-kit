import { Fragment, FunctionComponent } from 'react'
import classNames from 'classnames'
import Header from './Header'
import Footer from './Footer'
import { MessageList, useMessage } from '~/lib/message'

type LayoutProps = {
  usePadding?: boolean
  useBackdrop?: boolean
}

const FullLayout: FunctionComponent<LayoutProps> = ({
  children,
  usePadding,
  useBackdrop,
}) => {
  const { messages } = useMessage()
  return (
    <Fragment>
      <Header />
      <main
        className={classNames(
          'w-full h-screen mx-auto relative bg-base-100 text-base-content',
          usePadding && 'px-2 sm:px-6 lg:px-8',
          useBackdrop && 'bg-base-300'
        )}
        data-theme="light"
      >
        <MessageList messages={messages} />
        {children}
      </main>
      <Footer />
    </Fragment>
  )
}

FullLayout.defaultProps = {
  usePadding: true,
  useBackdrop: false,
}

export default FullLayout
