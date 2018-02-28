import React from 'react'


// this.setState({module: <Module/>}); 
const SubOption = (props) => {
  console.log(props)
  return (
    <div>
      { props.match.params.type }
    </div>
  )
}

export default SubOption