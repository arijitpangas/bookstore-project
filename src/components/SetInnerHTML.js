import React from 'react'

export default function SetInnerHTML({text}) {
    const htmlString= text
  return (
    <div dangerouslySetInnerHTML={{__html: htmlString}}/>
  )
}
