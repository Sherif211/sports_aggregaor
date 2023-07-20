import Document, {Head, Html, Main, NextScript} from 'next/document'
import React from 'react'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return <Html lang="en-US">
            <Head>
                <link rel="shortcut icon" href={process.env.NEXT_PUBLIC_FAVICON}/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link rel="apple-touch-icon" href={process.env.NEXT_PUBLIC_FAVICON}/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                    rel="stylesheet"/>
            </Head>
            <body className={process.env.NEXT_PUBLIC_THEME}>
            <Main/>
            <NextScript/>

            </body>
        </Html>
    }
}

export default MyDocument