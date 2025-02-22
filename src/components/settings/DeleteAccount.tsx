import Trashcan from '../../assets/common/trashcan.svg'
import { deleteProfile } from '../../helpers/profile/deleteProfile'
import type { Profile } from '../../models/profile'
import { Image } from '../image/Image'
import { button, subheader } from './Settings'

export const DeleteAccount: React.FC<{ profile: Profile }> = ({ profile }) => (
  <div className="w100">
    <div css={subheader} className={'pbutton rounded mt30 mb20 pink nohover'}>
      Danger zone
    </div>
    <button
      onClick={async () => {
        await deleteProfile(profile)
      }}
      css={button}
      className={'fr white'}
    >
      <Image alt="Trashcan" src={Trashcan} width={40} height={40} />
      <div className="ml15">Delete account</div>
    </button>
  </div>
)
