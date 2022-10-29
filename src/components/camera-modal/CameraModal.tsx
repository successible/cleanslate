import Scan from '../scanner/components/scan'
export const CameraModal = () => {
  return (
    <div>
      <Scan scanRate={250} covid19={false} upnqr={true} />
    </div>
  )
}
