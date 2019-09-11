import { CSSProperties } from 'react';

const styleMap: { [key: string]: CSSProperties } = {
  topDiv: {
    display: 'inline-flex'
  },
  topDivWhenErrorAtBottom: {
    flexDirection: 'column'
  },
  inputLabel: {
    left: 0,
    lineHeight: '1.21428571em',
    position: 'absolute',
    transition: 'top .2s cubic-bezier(.25, .8, .25, 1), font-size .2s cubic-bezier(.25, .8, .25, 1)',
  },
  boxInputLabel: {
    paddingLeft: '1em',
    top: 'calc(50% -  1.21428571em / 2 - 0.05em)',
  },
  lineInputLabel: {
    paddingLeft: '0.5em',
    top: 'calc(70% -  1.21428571em / 2 - 0.3em)',
  },
  focusedOrValuedInputLabel: {
    fontSize: '65%',
    paddingLeft: '0.3em',
    top: 0,
  },
  input: {
    paddingBottom: '0.407142858em',
    paddingTop: '0.95em',
  },
  lineInput: {
    borderLeft: 'none',
    borderRadius: 0,
    borderRight: 'none',
    borderTop: 'none',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
  },
  errorLineInput: {
    borderBottomColor: 'red'
  },
  validationIcon: {
    opacity: 1
  },
  leftIcon: {
    bottom: 'calc(0.4071em + 0.05em)',
    height: '1em',
    top: 'auto'
  },
  errorLabel: {
    background: 'none',
    color: 'red',
    fontWeight: 400,
    padding: 0,
    textAlign: 'left'
  },
  rightErrorLabel: {
    alignSelf: 'center'
  }
};

export default styleMap;
