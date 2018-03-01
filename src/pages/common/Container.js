import React from 'react'

const Container = (props) => {
  return (
    <div style={{background: '#fff', minHeight: 360, padding: '10px 8px' }}>
      {props.children}
    </div>
  )
}

export default Container