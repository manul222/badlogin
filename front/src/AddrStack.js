import React from 'react';

export function ByteBlock(props) {
  const defaultStyle = {
    width: 34, 
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
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
  const { value, base, range, style } = props;

  const styleForAddr = {
    fontWeight: "bold",
    marginLeft: 10,
    width: 200
  }

  const addrRangeStr = (base, range) => {
    if (!range) return base; 
    const hexBase = parseInt(base, 16);
    return `0x${hexBase.toString(16)} ~ 0x${(hexBase + range).toString(16)}`
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "row", 
      ...style}}>
      <div style={styleForAddr}>
        {addrRangeStr(base, range)}
      </div>
      {value ?
      <div style={{
        display: "fex",
        width: "100%",
        textAlign: "center",
        fontWeight: "bold"}}>
        <p>{value}</p>
      </div> : props.children}
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