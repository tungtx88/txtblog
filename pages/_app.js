import App from 'next/app'
import ThemeState from '../context/theme/ThemeState'
import CommentState from '../context/comment/CommentState'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeState>
        <CommentState>
            <Component {...pageProps} />
        </CommentState>
      </ThemeState>
    )
  }
}

export default MyApp