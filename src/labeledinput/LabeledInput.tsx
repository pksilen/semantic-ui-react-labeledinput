import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import cardsy from 'cardsy';
// eslint-disable-next-line import/no-named-default
import { default as getCreditCardType } from 'credit-card-type';
import { ValidationType } from '../validation/ValidationType';
import styleMap from '../styleMap';
import Validator from '../validation/Validator';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  allowEmptyValue: boolean;
  className?: string;
  countryCode: string;
  disabled: boolean;
  focus: boolean;
  errorText: string;
  errorTextPosition: 'bottom' | 'right';
  icon: SemanticICONS;
  iconColor: SemanticCOLORS;
  iconPosition: 'left' | 'right';
  inputId: string;
  label: string;
  maxLength?: number;
  maxValue?: number;
  minLength?: number;
  minValue?: number;
  onValueChange: (value: string) => void;
  presentation: 'box' | 'line';
  size: 'large' | 'big' | 'huge' | 'massive';
  type: string;
  validation?: ValidationType;
  validationSuccessIcon: SemanticICONS;
  validationErrorIcon: SemanticICONS;
  value: string;
}

type State = {
  hasValidValue: boolean;
  hasFocus: boolean;
  hasBeenFocused: boolean;
};

export default class LabeledInput extends React.Component<Props, {}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static propTypes: { [key in keyof Props]: any } = {
    allowEmptyValue: PropTypes.bool,
    className: PropTypes.string,
    countryCode: PropTypes.string,
    disabled: PropTypes.bool,
    focus: PropTypes.bool,
    errorText: PropTypes.string,
    errorTextPosition: PropTypes.oneOf(['bottom', 'right']),
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    inputId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    maxValue: PropTypes.number,
    minLength: PropTypes.number,
    minValue: PropTypes.number,
    onValueChange: PropTypes.func.isRequired,
    presentation: PropTypes.oneOf(['box', 'line']),
    size: PropTypes.oneOf(['large', 'big', 'huge', 'massive']),
    type: PropTypes.string,
    validation: PropTypes.oneOfType([
      PropTypes.oneOf([
        'url',
        'emailAddress',
        'creditCardNumber',
        'creditCardExpiration',
        'creditCardVerificationCode',
        'number',
        'integer',
        'alphaNumeric',
        'usZipCode',
        'caPostCode',
        'ukPostCode',
        'phoneNumber',
        'usSSN',
        'ipAddress',
        'ipv4Address',
        'ipv6Address',
        'hexColor'
      ]),
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.instanceOf(RegExp),
      PropTypes.func
    ]),
    validationErrorIcon: PropTypes.string,
    validationSuccessIcon: PropTypes.string,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    allowEmptyValue: false,
    className: undefined,
    countryCode: '',
    disabled: false,
    focus: false,
    errorText: '',
    errorTextPosition: 'bottom',
    icon: '',
    iconColor: undefined,
    iconPosition: 'left',
    maxLength: undefined,
    maxValue: undefined,
    minLength: undefined,
    minValue: undefined,
    presentation: 'box',
    size: 'huge',
    type: undefined,
    validation: undefined,
    validationErrorIcon: '',
    validationSuccessIcon: ''
  };

  state: State = {
    hasValidValue: true,
    hasFocus: false,
    hasBeenFocused: false
  };

  onInputBlur = (): void => {
    const { allowEmptyValue, countryCode, maxValue, minLength, minValue, validation, value } = this.props;

    this.setState({
      hasFocus: false
    });

    if (allowEmptyValue && !value) {
      return;
    }

    if (validation) {
      const hasValidValue = Validator.validateValue(
        value,
        validation,
        minValue,
        maxValue,
        countryCode,
        minLength
      );

      this.setState({
        hasValidValue
      });
    }
  };

  onInputFocus = (): void => {
    this.setState({
      hasValidValue: true,
      hasFocus: true,
      hasBeenFocused: true
    });
  };

  onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const { onValueChange, validation } = this.props;

    if (validation === 'creditCardNumber') {
      onValueChange(cardsy.format.number(value));
    } else if (validation === 'creditCardExpiration') {
      onValueChange(cardsy.format.expiryString(value));
    } else if (validation === 'creditCardVerificationCode') {
      onValueChange(cardsy.format.cvc(value));
    } else {
      onValueChange(value);
    }
  };

  getInputType = (): string => {
    const { type, validation } = this.props;

    if (type) {
      return type;
    }

    switch (validation) {
      case 'emailAddress':
        return 'email';

      case 'phoneNumber':
        return 'tel';

      case 'url':
        return 'url';

      default:
        return 'text';
    }
  };

  // noinspection OverlyComplexFunctionJS
  getIconName = (): SemanticICONS => {
    const { icon, validation, validationErrorIcon, validationSuccessIcon, value } = this.props;
    const { hasFocus, hasBeenFocused, hasValidValue } = this.state;

    if (validationErrorIcon && !hasValidValue) {
      return hasFocus ? ('' as SemanticICONS) : validationErrorIcon;
    }

    if (validationSuccessIcon && hasValidValue) {
      return hasFocus || !hasBeenFocused ? ('' as SemanticICONS) : validationSuccessIcon;
    }

    if (validation === 'creditCardNumber' && value) {
      const creditCardTypes = getCreditCardType(value);
      const creditCardType = creditCardTypes && creditCardTypes[0] ? creditCardTypes[0].niceType : '';

      switch (creditCardType) {
        case 'Visa':
          return 'cc visa';

        case 'Mastercard':
          return 'cc mastercard';

        case 'American Express':
          return 'cc amex';

        case 'Diners Club':
          return 'cc diners club';

        case 'Discover':
          return 'cc discover';

        case 'JCB':
          return 'cc jcb';

        default:
          return 'credit card';
      }
    }

    return icon;
  };

  getIconColor = (): SemanticCOLORS => {
    const { iconColor, validationErrorIcon, validationSuccessIcon } = this.props;
    const { hasFocus, hasValidValue } = this.state;

    const hasValidationIcon = !hasFocus && (validationErrorIcon || validationSuccessIcon);

    if (hasValidationIcon && hasValidValue) {
      return 'green';
    }

    if (hasValidationIcon && !hasValidValue) {
      return 'red';
    }

    return iconColor;
  };

  hasIcon = (): boolean => {
    const { icon, validation, validationErrorIcon, validationSuccessIcon, value } = this.props;

    const hasValidationIcon = validationErrorIcon || validationSuccessIcon;
    const hasCreditCardIcon = validation === 'creditCardNumber' && value;

    return !!icon || hasValidationIcon || hasCreditCardIcon;
  };

  getClassName = (): string => {
    const {
      disabled,
      focus,
      iconPosition,
      presentation,
      size,
      validationErrorIcon,
      validationSuccessIcon
    } = this.props;
    const { hasValidValue } = this.state;

    let className = `ui input ${size}`;

    if (this.hasIcon()) {
      className = `${className} ${
        validationErrorIcon || validationSuccessIcon ? 'right' : iconPosition
      } icon`;
    }

    if (disabled) {
      className = `${className} disabled`;
    }

    if (focus) {
      className = `${className} focus`;
    }

    if (!hasValidValue && presentation === 'box') {
      className = `${className} error`;
    }

    return className;
  };

  getIconStyle = (): React.CSSProperties => {
    const { iconPosition, validationErrorIcon, validationSuccessIcon } = this.props;

    if (validationErrorIcon || validationSuccessIcon) {
      return styleMap.validationIcon;
    }

    if (iconPosition === 'left') {
      return styleMap.leftIcon;
    }

    return {};
  };

  render(): React.ReactElement {
    const {
      allowEmptyValue,
      countryCode,
      disabled,
      focus,
      errorText,
      errorTextPosition,
      icon,
      iconColor,
      iconPosition,
      inputId,
      label,
      minLength,
      minValue,
      maxLength,
      maxValue,
      onValueChange,
      presentation,
      size,
      style,
      type,
      validation,
      validationErrorIcon,
      validationSuccessIcon,
      value,
      ...restOfProps
    } = this.props;

    const { hasFocus, hasValidValue } = this.state;

    const topDivStyle = {
      ...styleMap.topDiv,
      ...(errorTextPosition === 'bottom' ? styleMap.topDivWhenErrorAtBottom : {})
    };

    const inputLabelStyle = {
      ...styleMap.inputLabel,
      ...(presentation === 'line' ? styleMap.lineInputLabel : styleMap.boxInputLabel),
      ...(hasFocus || value ? styleMap.focusedOrValuedInputLabel : {})
    };

    const inputStyle = {
      ...styleMap.input,
      ...(presentation === 'line' ? styleMap.lineInput : {}),
      ...(!hasValidValue && presentation === 'line' ? styleMap.errorLineInput : {})
    };

    const errorLabelStyle = {
      ...styleMap.errorLabel,
      ...(errorTextPosition === 'right' ? styleMap.rightErrorLabel : {})
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <div style={topDivStyle} {...restOfProps}>
        <div className={this.getClassName()}>
          <label style={inputLabelStyle} htmlFor={inputId}>
            {label}
          </label>
          <input
            id={inputId}
            maxLength={maxLength}
            type={this.getInputType()}
            onBlur={this.onInputBlur}
            onFocus={this.onInputFocus}
            onChange={this.onInputChange}
            style={inputStyle}
            value={value}
          />
          {this.hasIcon() ? (
            <Icon color={this.getIconColor()} name={this.getIconName()} style={this.getIconStyle()} />
          ) : (
            undefined
          )}
        </div>
        {!hasValidValue && errorText ? (
          <div className={`ui label errorLabel ${size}`} style={errorLabelStyle}>
            {errorText}
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}
