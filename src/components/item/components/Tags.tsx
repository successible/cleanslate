import { css } from '@emotion/react'

type props = { tags: string[] }
export const Tags: React.FC<props> = ({ tags }) => {
  const tag = css`
    border-radius: 5px;
    font-size: 0.7rem;
    font-weight: 400;
    margin-right: 5px;
    margin-top: 5px;
    padding: 5px 7.5px;
  `

  return (
    <div className="fc">
      {tags.length > 0 && (
        <div className="fr m5 wrap">
          {tags.map((t) => (
            <span css={tag} className={`pink`} key={t}>
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
