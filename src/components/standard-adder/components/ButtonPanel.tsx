import React from 'react'
import { SubmitButton } from '../../item-update-modal/components/SubmitButton'

type props = {
  showSubmit: boolean
  submit: () => void
}
export const ButtonPanel: React.FC<props> = ({ showSubmit, submit }) => {
  return (
    <div className="w100 fre mb20">
      {showSubmit && (
        <SubmitButton className="mt20" submit={false} onClick={submit} />
      )}
    </div>
  )
}
