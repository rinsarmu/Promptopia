
import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'
export const metadata = {
    title: 'PromptopiA',
    description: 'Discover and share AI prompts'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className="mains px-24 hidden">
                        <div className="gradient" />
                    </div>
                    <main className='mx-4 md:mx-8 '>
                        <Nav />
                        {children}

                    </main>
                </Provider>

            </body>

        </html>
    )
}

export default RootLayout