import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className="w-11/12">
      <div style={hideWhenVisible}>
        <button
          id="toggleable-button-show"
          onClick={toggleVisibility}
          className="px-3 py-1 rounded-lg bg-accent1 text-sm font-semibold text-gr1">
            {props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility} className="px-3 py-1 rounded-lg bg-gr4 text-sm font-semibold text-gr1">Cancel</button>
        {props.children}
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable