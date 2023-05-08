import React, { useEffect, useState } from 'react'
import axios from '../Axios/Axios';
import { Container } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { Load } from '../Atom/Atom';
import { ViewFlight } from './ViewFlight';

export const Flight = () => {
    const[flight,setFlight]=useState();
    const[loading,setLoading]=useRecoilState(Load)
    useEffect(()=>
    {
        setLoading(true)
        axios.post("/admin/flight").then(async(result)=>
        {
            await setFlight(result.data.result);
            setLoading(false);
        }).catch((err)=>console.log(err));
    },[])
  return (
    <Container >
        {!loading&&flight?(<>{flight.map((f,k)=>(<ViewFlight fl={f}/>))}</>):(<>
        </>)}
        
    </Container>
  )
}
