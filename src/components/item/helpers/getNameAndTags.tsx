import { truncate } from 'lodash-es'
import { capitalize } from '../../../helpers/capitalize'
import { getDummyFoodPath } from '../../standard-adder/helpers/getDummyFoodPath'
import { getDummyFoodTree } from '../../standard-adder/helpers/getDummyFoodTree'
import { getThreshold } from './getThreshold'

export const TRUNCATE_LENGTH = 30

export const getNameAndTags = (
  name: string,
  alias: string
): { name: string; tags: string[] } => {
  const dynamicName =
    alias.indexOf('[') === -1 ? '' : alias.slice(alias.indexOf('['))

  const path = getDummyFoodPath(alias || name)

  if (path === null) {
    return { name: truncate(name, { length: TRUNCATE_LENGTH }), tags: [] }
  }
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
  const tagsToRender =
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

  const nameToRender = dynamicName
    ? `${dynamicName
        .replace('[', '')
        .replace(']', '')} ${nameToUse.toLowerCase()}`
    : nameToUse

  return {
    name: truncate(nameToRender, { length: TRUNCATE_LENGTH }),
    tags: tagsToRender,
  }
}
