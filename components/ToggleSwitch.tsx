import React, { ChangeEventHandler } from 'react'

interface Props {
    onChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
}

// component that renders toggle switch on popup windows

const ToggleSwitch: React.FC<Props> = ({onChange, checked}) => {
  return (
    <label className="switch">
        <input checked={checked} onChange={onChange} type="checkbox"/>
        <span className="slider round"></span>
    </label>
  )
}

export default ToggleSwitch