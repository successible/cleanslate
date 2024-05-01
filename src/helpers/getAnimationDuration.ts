/** For a given animation name, like "fadeOut", return how long the animation duration should be in milliseconds
 * both as a string (e.g. 0.5s) and as a number in milliseconds (e.g. 500)
 */
export const getAnimationDuration = (
  animationName?: string
): [string, number] => {
  // Disable the fadeIn and fadeOut animation on anything bigger than an iPad Pro
  if (['fadeIn', 'fadeOut', 'fadeOutHard'].includes(animationName || '')) {
    return ['0s', 0]
  }
  // If the animation name is included but not matched, assumed the duration is 0.5s
  return ['0.5s', 500]
}
