import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import hasOwnProperty from 'shared/hasOwnProperty'

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
}

function hasValidKey(config) {
  return config.key !== undefined
}

function hasValidRef(config) {
  return config.ref !== undefined
}

function ReactElement(type, key, ref, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __tag: '我的',
  }
}

export function jsx(type, config, maybeKey) {
  let propName

  const props = {}

  let key = null
  let ref = null

  if (maybeKey !== undefined) {
    key = '' + maybeKey
  }

  if (hasValidKey(config)) {
    key = '' + config.key
  }

  if (hasValidRef(config)) {
    ref = config.ref
  }

  // Remaining properties are added to a new props object
  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      !Object.prototype.hasOwnProperty.call(RESERVED_PROPS, propName)
    ) {
      props[propName] = config[propName]
    }
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }

  return ReactElement(type, key, ref, props)
}

export const jsxDEV = jsx
