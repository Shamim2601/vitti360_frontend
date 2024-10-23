import React from 'react'
import { SignUp as SignupComponent } from '../components/index.js'
import {Helmet} from "react-helmet";

function SignUp() {
  return (
    <>
    {/* <Helmet>
        <title>Blog SignUp</title>
        <meta name="description" content="" />
      </Helmet> */}
    <div className='py-8'>
        <SignupComponent />
    </div>
    </>
  )
}

export default SignUp