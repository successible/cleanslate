import { css } from '@emotion/react'

export const LegalDisclaimer = () => {
  const legalLink = process.env.NEXT_PUBLIC_LEGAL_LINK
  return legalLink && legalLink !== 'no' ? (
    <p
      css={css`
        font-size: 0.7rem;
        text-align: center;
        padding-bottom: 10px;
      `}
    >
      By logging in, you agree to our{' '}
      <a target="_blank" rel="noopener noreferrer" href={legalLink}>
        Terms
      </a>{' '}
      &#38;{' '}
      <a target="_blank" rel="noopener noreferrer" href={legalLink}>
        Privacy Policy
      </a>
    </p>
  ) : (
    <div></div>
  )
}
