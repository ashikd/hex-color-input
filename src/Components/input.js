import React from 'react'

export default function InputComp(props) {
  const [value, setValue] = useState('');
  return (
    <input
      type="color"
      className="hiddenInput"
      onChange={(e)=>colorChange(e, value)}
      value={value}
    />
  )
}
