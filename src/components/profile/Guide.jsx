import React from 'react'
import guide from '../../img/guide.png'
import styled from 'styled-components'

function Guide() {
  return (
    <StDiv >
        <img  style={{width:"100%"}} src={guide} />
    </StDiv >
  )
}

export default Guide

const StDiv = styled.div`
    display: flex; 
    width:100%;
    margin:0 auto;
    @media screen and (min-width: 769px){
        max-width: 1004px;
    }
`