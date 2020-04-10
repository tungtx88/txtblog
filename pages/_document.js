import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" href="/static/css/include/bootstrap.css" type="text/css" />
          <link rel="stylesheet" href="/static/css/style.css" type="text/css" />
          <link rel="stylesheet" href="/static/css/include/dark.css" type="text/css" />
          <link rel="stylesheet" href="/static/css/include/font-icons.css" type="text/css" />
          <link rel="stylesheet" href="/static/css/include/animate.css" type="text/css" />
          <link rel="stylesheet" href="/static/css/include/magnific-popup.css" type="text/css" />
          <link rel="stylesheet" href=" https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.7.2/flexslider.min.css" type="text/css" />
          <link rel="stylesheet" href="/static/css/include/responsive.css" type="text/css" />
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" type="text/css" />

          <link rel="stylesheet" href="/static/css/styles.css" />
        </Head>
        <body className="stretched">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument