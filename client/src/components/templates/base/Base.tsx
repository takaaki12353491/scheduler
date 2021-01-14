import React from 'react'
import Header from '../../organisms/header/Header'

const Base: React.FC = (props) => {
  return (
    <>
      <Header/>
      {props.children}
    </>
  )
}
export default Base