import { getAuth } from 'firebase/auth'
import Trashcan from '../../assets/common/trashcan.svg'
import { deleteProfile } from '../../helpers/authentication/deleteProfile'
import { logout } from '../../helpers/authentication/logout'
import { Profile } from '../../models/Profile/model'
import { firebaseApp } from '../../pages'
import { Image } from '../image/Image'
import { button, subheader } from './Settings'

export const DeleteAccount: React.FC<{ profile: Profile }> = ({ profile }) => (
  <div className="w100">
    <div css={subheader} className={`pbutton rounded mt30 mb20 pink nohover`}>
      Danger zone
    </div>
    <button
      onClick={async () => {
        await deleteProfile(profile)
        const auth = getAuth(firebaseApp)
        await auth.currentUser?.delete()
        window.alert('Your account has been deleted!')
        await logout(false)
      }}
      css={button}
      className={`fr white`}
    >
      <Image alt="Trashcan" src={Trashcan} width={40} height={40} />
      <div className="ml15">Delete account</div>
    </button>
  </div>
)
