import { forwardRef, InputHTMLAttributes } from 'react'
import { RegularText } from '../Typography'
import {
  InputWrapper,
  InputStyleContainer,
  InputStyled,
  RightText,
} from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  rightText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, rightText, className, ...props }, ref) => {
    return (
      <InputWrapper className={className}>
        <InputStyleContainer hasError={!!error}>
          <InputStyled ref={ref} {...props} />
          {rightText && <RightText>{rightText}</RightText>}
        </InputStyleContainer>
        {error && <RegularText size="s">{error}</RegularText>}
      </InputWrapper>
    )
    // eslint-disable-next-line prettier/prettier
  }
)

Input.displayName = 'Input'

export default Input
