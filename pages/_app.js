import App from 'next/app'
import ThemeState from '../context/theme/ThemeState'
import CommentState from '../context/comment/CommentState'
import AlertState from '../context/alert/AlertState'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeState>
        <CommentState>
          <AlertState>
            <Component {...pageProps} />
          </AlertState>
        </CommentState>
      </ThemeState>
    )
  }
}

export default MyApp