import Exit from '../../assets/common/logout.svg'
import type { Profile } from '../../models/profile'
import { Explanation } from '../explanation/Explanation'
import { Image } from '../image/Image'
import { button, subheader } from './Settings'

export const DataZone: React.FC<{ profile: Profile }> = ({ profile }) => (
  <div className="w100">
    <div css={subheader} className={'pbutton rounded mt30 mb20 yellow nohover'}>
      Data Zone
    </div>
    <button
      type="button"
      onClick={async () => {
        const blob = new Blob([JSON.stringify(profile, null, 2)], {
          type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'export.json'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }}
      css={button}
      className={'fr white'}
    >
      <Image alt="Trashcan" src={Exit} width={40} height={40} />
      <div className="ml15">Export data</div>
    </button>
    <Explanation color="background">
      <div>
        Download your data as JSON. Once exported, it cannot be imported back.
      </div>
    </Explanation>
  </div>
)
