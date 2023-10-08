import React from 'react';

export function ByteBlock(props) {
  const defaultStyle = {
    width: 15, 
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 10,
  };

  return (
    <div style={{ 
      ...defaultStyle,
      ...props.style}}>
      <div>{props.value}</div>
    </div>
  );
}

export function AddrRecord(props) {
  const { value, addr, style } = props;

  const styleForAddr = {
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 3, 
    width: '225px !important',
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "row", 
      ...style}}>
        <div style={styleForAddr}>{addr}</div>
      {value ?
      <div style={{
        display: "fex",
        textAlign: "center",
        fontWeight: "bold"}}>
        <p>{value}</p>
      </div> : 
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        }}>{props.children}</div>}
    </div>
  );
}

export function AddrStack(props) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      ...props.style
    }}>
      {props.children}
    </div>
  )
}