import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <div style={{margin:"auto" ,textAlign:"center"}}>
      <Spinner animation="border" />
    </div>
  );
}
