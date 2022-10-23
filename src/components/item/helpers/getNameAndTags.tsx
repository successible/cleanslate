import { css } from '@emotion/react'
import { capitalize } from '../../../helpers/utility/capitalize'
import { getDummyFoodPath } from '../../searchbar/helpers/getDummyFoodPath'
import { getDummyFoodTree } from '../../searchbar/helpers/getDummyFoodTree'
import { getThreshold } from './getThreshold'

export const getNameAndTags = (name: string, alias: string) => {
  // Remove dynamic name
  const dynamicName = alias.slice(alias.indexOf('['))
  const path = getDummyFoodPath(alias || name)

  if (path === null) {
    return <div>{name}</div>
  } else {
    const { leaf, stem } = path
    const { root } = getDummyFoodTree(path)
    const threshold = getThreshold(root)

    // If the stem only have two segments or less (the default threshold)
    // Just render the name in full. Do not modify it.
    // Otherwise, remove all the tags that will be used from the name
    // This, by default, is all but the first two segments
    const nameToUse = capitalize(
      (stem.length <= threshold ? name : stem.slice(0, threshold).join(' '))
        // Certain dummy foods need their root removed from the name
        .replace('whole grain ', '')
      // Otherwise, it is Ground meat turkey
    ).replace('Ground meat', 'Ground')

    const forbiddenTags = ['i want to be more specific']
    // If the stem only has two segments or less, the default threshold, don't render any tags
    const tagsToUse =
      stem.length <= threshold
        ? []
        : // Remove duplicates, in case of overlaps between the stem and leaf
          [...new Set([...stem, leaf])]
            .slice(threshold)
            // If the name, like Protein powder, includes a tag, like powder, remove the tag
            .filter((t) => !nameToUse.includes(t))
            // Do not include any of the forbidden tags
            .filter((t) => !forbiddenTags.includes(t))
            // Exclude any of the dynamic name
            .filter((t) => !dynamicName.toLowerCase().includes(t))
            // Remove any parentheses, inspired by the ground meat bug
            .map((t) => t.replace('(', '').replace(')', ''))

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
        {/* Basically, if the dynamic name exists, append it to the top of the name */}
        {dynamicName
          ? `${dynamicName
              .replace('[', '')
              .replace(']', '')} ${nameToUse.toLowerCase()}`
          : nameToUse}
        {tagsToUse.length > 0 && (
          <div className="fr m5 wrap">
            {tagsToUse.map((n, i) => (
              <span css={tag} className={`pink`} key={n}>
                {/* Capitalize the first tag but only if there is one tag */}
                {i === 0 && tagsToUse.length === 1 ? capitalize(n) : n}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  }
}
