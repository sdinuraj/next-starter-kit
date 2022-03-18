import { FunctionComponent } from 'react'
import { Alert } from '@reach/alert'
import classNames from 'classnames'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { MessageProps } from './message.types'

const Message: FunctionComponent<MessageProps> = ({ message, type }) => (
  <Alert
    className={classNames(
      'app-message shadow-md rounded px-3 py-2 text-shadow transition-all mt-2',
      type === 'error'
        ? 'bg-error text-error-content'
        : type === 'success'
        ? 'bg-success text-success-content'
        : 'bg-info text-info-content'
    )}
  >
    {' '}
    {type === 'success' ? (
      <FaCheckCircle className="inline-block" />
    ) : (
      <FaExclamationCircle className="inline-block" />
    )}{' '}
    &nbsp; {message}
  </Alert>
)

export default Message
