import React, { useState } from 'react'
import { MdNotifications } from 'react-icons/md'

import './notification.css'

const Notification = () => {
  const [visible, visibleState] = useState("none")

  function verifyVisible() {
    if(visible == "block") {
      visibleState("none")
    } else {
      visibleState("block")
    }
  }

  return (
    <>
      <div className='container_notification'>
        <MdNotifications color='#7159c1' size={20} onClick={()=>verifyVisible()} className='iconNotification'/>
        <div className='list_notification' style={{display: visible}}>
          <ul>
            <li>
              <p>Voce possui uma notification</p>
              <time>ha 2 dias</time>
              <button>Marcar como lida</button>
            </li>
            <li>
              <p>Voce possui uma notification</p>
              <time>ha 2 dias</time>
              <button>Marcar como lida</button>
            </li>
            <li>
              <p>Voce possui uma notification</p>
              <time>ha 2 dias</time>
              <button>Marcar como lida</button>
            </li>
            <li>
              <p>Voce possui uma notification</p>
              <time>ha 2 dias</time>
              <button>Marcar como lida</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Notification