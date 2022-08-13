import React, { useState, useMemo, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight, MdSchedule } from 'react-icons/md'
import { addDays, format, subDays, setHours, setMinutes, setSeconds, isEqual, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Header from '../../components/Header'
import axios from 'axios'
import { utcToZonedTime } from 'date-fns-tz'
import { isBefore } from 'date-fns/esm'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import './index.css'
import { authUser } from '../../redux/actions/authActions'

const Dashboard = () => {
  const [ date, setDay ] = useState(new Date())
  const [ listDate, setDate ]: any = useState([])

  const dateFormateed = format(date, "d 'de' MMMM", { locale: pt})

  const selector = useSelector(authUser)

  const token = selector.payload.user.data.token
  const userId = selector.payload.user.data

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  function subDate() {
    setDay(subDays(date, 1))
  }

  function addDate() {
    setDay(addDays(date, 1))
  }

  const range = [
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ]

  useEffect(()=>{
    async function loadShedule() {
      const response = await axios.get('http://localhost:2000/appointments', config)

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const data = range.map((hour: any)=>{
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0)
        const compareDate = utcToZonedTime(checkDate, timeZone)

        const dateOfUtc = [format(compareDate, "yyyy-MM-d' 'HH:mm:ss'.000 +00:00")]

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),  
          appointment: response.data.find((a: any) => {
            if(a.date == dateOfUtc[0]) {return a} else {return undefined}
          }),
          date: dateOfUtc.filter( p => {
            return p.includes(`${hour}:`)
          })
        }
      })

      setDate(data)
    }

    loadShedule()
  }, [date])

  async function clickNewDate(obj: any) {
    const response = await axios.post('http://localhost:2000/appointment', {
      user_id: userId.UserOne.id, 
      provider_id: 1,
      date: obj.date[0]
    }, config)

    window.location.reload()

  } 

  return (
    <>
      <Header/>
      <div className='container_dashboard'>
        <header>
          <button onClick={()=>subDate()}>
            <MdChevronLeft size={36} color="#fff"/>
          </button>
          <strong>{dateFormateed}</strong>
          <button onClick={()=>addDate()}>
            <MdChevronRight size={36} color="#fff"/>
          </button>
        </header>

        <ul>
          {
            listDate.map((a: any, key: any)=>{

              const dateExists = a.past === true || a.appointment !== undefined ? 'reserved_time' : 'open_time'
              const dateBusy = a.past === true || a.appointment !== undefined ? 'Ocupado' : 'Em aberto'

              return <>
                <li className={dateExists} onClick={()=>{dateExists === 'open_time' ? clickNewDate(a) : toast.error("Esse horario ja esta ocupado")}} key={key}>
                  <strong>{a.time}</strong>
                  <span>{dateBusy}</span>
                </li>
              </>
            })
          }
        </ul>
      </div>
    </>
  )
}

export default Dashboard