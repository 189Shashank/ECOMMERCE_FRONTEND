import React from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header'
import Footer from './Footer'
import Helmet from 'react-helmet'

const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
          <description>{description}</description>
          <keywords>{keywords}</keywords>
          <author>{author}</author>
      </Helmet>
        <Header/>
        <main style={{minHeight:"80vh"}}>
        <ToastContainer />
        {children}
        </main>
        <Footer/>
    </div>
  )
}
Layout.defaultProps={
  title:"Ecommerce app - shop now",
  description:"mern stack project",
  keywords:"mern,react,node,mongodb",
  author:"Techinfoyt"
}
export default Layout