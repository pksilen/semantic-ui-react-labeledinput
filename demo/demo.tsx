import * as React from 'react';
import { render } from 'react-dom';
import { CheckboxProps, Form, Radio } from 'semantic-ui-react';
import LabeledInput from '../src/labeledinput/LabeledInput';

interface State {
  values: string[];
  errorTextPosition: 'bottom' | 'right';
  presentation: 'box' | 'line';
}

class DemoApp extends React.Component<{}, State> {
  // noinspection MagicNumberJS
  state: State = {
    values: Array(24).fill(''),
    errorTextPosition: 'bottom',
    presentation: 'box'
  };

  changeValue = (newValue: string, componentIndex: number): void => {
    this.setState(
      (prevState: State): State => {
        const { values } = prevState;
        values[componentIndex] = newValue;

        return {
          ...prevState,
          values
        };
      }
    );
  };

  changePresentation = (event: React.FormEvent<HTMLInputElement>, { value }: CheckboxProps): void => {
    const presentation = value as 'box' | 'line';
    this.setState(
      (prevState: State): State => ({
        ...prevState,
        presentation
      })
    );
  };

  changeErrorTextPosition = (event: React.FormEvent<HTMLInputElement>, { value }: CheckboxProps): void => {
    const errorTextPosition = value as 'bottom' | 'right';
    this.setState(
      (prevState: State): State => ({
        ...prevState,
        errorTextPosition
      })
    );
  };

  render(): React.ReactElement {
    const { errorTextPosition, presentation, values } = this.state;

    // noinspection MagicNumberJS
    return (
      <div style={{ marginLeft: '5px' }}>
        <h1>Demo</h1>
        <Form>
          <p>Presentation</p>
          <Form.Field>
            <Radio
              label="box"
              name="presentation"
              value="box"
              checked={presentation === 'box'}
              onChange={this.changePresentation}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="line"
              name="presentation"
              value="line"
              checked={presentation === 'line'}
              onChange={this.changePresentation}
            />
          </Form.Field>
          <br />
          <p>Error text position</p>
          <Form.Field>
            <Radio
              label="bottom"
              name="errorTextPosition"
              value="bottom"
              checked={errorTextPosition === 'bottom'}
              onChange={this.changeErrorTextPosition}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="right"
              name="errorTextPosition"
              value="right"
              checked={errorTextPosition === 'right'}
              onChange={this.changeErrorTextPosition}
            />
          </Form.Field>
        </Form>
        <h2>LabeledInput</h2>
        LabeledInput without validation
        <br />
        <LabeledInput
          inputId="input0"
          label="Value"
          presentation={presentation}
          value={values[0]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 0)}
        />
        <br />
        <br />
        LabeledInput with URL validation
        <br />
        <LabeledInput
          inputId="input1"
          label="URL"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a valid URL"
          validation="url"
          value={values[1]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 1)}
        />
        <br />
        <br />
        LabeledInput with e-mail address validation
        <br />
        <LabeledInput
          inputId="input2"
          label="E-mail address"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a valid e-mail address"
          validation="emailAddress"
          value={values[2]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 2)}
        />
        <br />
        <br />
        LabeledInput with credit card number validation
        <br />
        <LabeledInput
          inputId="input3"
          label="Credit card number"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a valid credit card number"
          validation="creditCardNumber"
          value={values[3]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 3)}
        />
        <br />
        <br />
        LabeledInput with credit card expiration validation
        <br />
        <LabeledInput
          inputId="input4"
          label="MM / YY"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a valid credit card expiration"
          validation="creditCardExpiration"
          value={values[4]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 4)}
        />
        <br />
        <br />
        LabeledInput with credit card verification code validation
        <br />
        <LabeledInput
          inputId="input5"
          label="CVC"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a valid CVC"
          validation="creditCardVerificationCode"
          value={values[5]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 5)}
        />
        <br />
        <br />
        LabeledInput with number validation
        <br />
        <LabeledInput
          inputId="input6"
          label="Number"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a number"
          validation="number"
          value={values[6]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 6)}
        />
        <br />
        <br />
        LabeledInput with integer validation
        <br />
        <LabeledInput
          inputId="input7"
          label="Integer"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be an integer"
          validation="integer"
          value={values[7]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 7)}
        />
        <br />
        <br />
        LabeledInput with alphaNumeric validation
        <br />
        <LabeledInput
          inputId="input8"
          label="AlphaNumeric"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be alphanumeric"
          validation="alphaNumeric"
          value={values[8]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 8)}
        />
        <br />
        <br />
        LabeledInput with US ZIP code validation
        <br />
        <LabeledInput
          inputId="input9"
          label="US ZIP"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a US ZIP code"
          validation="usZipCode"
          value={values[9]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 9)}
        />
        <br />
        <br />
        LabeledInput with Canadian postal code validation
        <br />
        <LabeledInput
          inputId="input10"
          label="CA postal code"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a CA postal code"
          validation="caPostCode"
          value={values[10]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 10)}
        />
        <br />
        <br />
        LabeledInput with UK postal code validation
        <br />
        <LabeledInput
          inputId="input11"
          label="UK postal code"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a UK postal code"
          validation="ukPostCode"
          value={values[11]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 11)}
        />
        <br />
        <br />
        LabeledInput with phone number validation
        <br />
        <LabeledInput
          inputId="input12"
          label="Phone number"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a phone number"
          validation="phoneNumber"
          value={values[12]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 12)}
        />
        <br />
        <br />
        LabeledInput with US social security number validation
        <br />
        <LabeledInput
          inputId="input13"
          label="US SSN"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a US SSN"
          validation="usSSN"
          value={values[13]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 13)}
        />
        <br />
        <br />
        LabeledInput with IP address validation
        <br />
        <LabeledInput
          inputId="input14"
          label="IP address"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be an IP address"
          validation="ipAddress"
          value={values[14]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 14)}
        />
        <br />
        <br />
        LabeledInput with IPv4 address validation
        <br />
        <LabeledInput
          inputId="input15"
          label="IPv4 address"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be an IPv4 address"
          validation="ipv4Address"
          value={values[15]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 15)}
        />
        <br />
        <br />
        LabeledInput with IPv6 address validation
        <br />
        <LabeledInput
          inputId="input16"
          label="IPv6 address"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be an IPv6 address"
          validation="ipv6Address"
          value={values[16]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 16)}
        />
        <br />
        <br />
        LabeledInput with hex color validation
        <br />
        <LabeledInput
          inputId="input17"
          label="Hex color"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          errorText="Must be a hex color"
          validation="hexColor"
          value={values[17]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 17)}
        />
        <br />
        <br />
        LabeledInput with icon
        <br />
        <LabeledInput
          inputId="input18"
          label="Search..."
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          icon="search"
          value={values[18]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 18)}
        />
        <br />
        <br />
        LabeledInput with validation icons
        <br />
        <LabeledInput
          inputId="input19"
          label="Number"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          validation="number"
          validationErrorIcon="exclamation"
          validationSuccessIcon="check"
          errorText="Must be a number"
          value={values[19]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 19)}
        />
        <br />
        <br />
        <h2>Sizes</h2>
        <br />
        Large
        <br />
        <LabeledInput
          inputId="input20"
          label="Enter value"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          size="large"
          value={values[20]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 20)}
        />
        <br />
        <br />
        Big
        <br />
        <LabeledInput
          inputId="input21"
          label="Enter value"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          size="big"
          value={values[21]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 21)}
        />
        <br />
        <br />
        Huge
        <br />
        <LabeledInput
          inputId="input22"
          label="Enter value"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          size="huge"
          value={values[22]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 22)}
        />
        <br />
        <br />
        Massive
        <br />
        <LabeledInput
          inputId="input23"
          label="Enter value"
          errorTextPosition={errorTextPosition}
          presentation={presentation}
          size="massive"
          value={values[23]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 23)}
        />
        <p>
          <br />
        </p>
        <a href="https://github.com/pksilen/semantic-ui-react-labeledinput">
          View semantic-ui-react-labeledinput on GitHub
        </a>
      </div>
    );
  }
}

const rootElement = document.getElementById('app-root');

if (rootElement) {
  render(<DemoApp />, rootElement);
}
