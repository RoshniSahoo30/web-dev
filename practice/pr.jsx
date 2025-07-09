import React, { useState } from 'react'
import axios from 'axios';

const App = () => {

  const [info, setInfo] = useState([]);
  const getData = async() => {
    const res = await axios.get('https://picsum.photos/v2/list');
    //const info= res.data;
    setInfo(res.data);
    //console.log(info);
  }
  return (
    <div className='p-10'>
      <button onClick={getData} className='bg-emerald-50 text-white font-semibold font-2xl px-6 py-3 rounded active:scale-90'>Get Data</button>
      <div className='p-5 mt-5 bg-gray-950'>
        {info.map(function (item, idx) {
            return <div key={idx} className='bg-gray-50 px-7 py-6 rounded mb-3 text-black flex items-center justify-between w-full'>
              <img src={item.download_url} alt="" className='h-40' />
              <h1>{item.author}</h1>
              </div>
        })}
        </div>
      </div>
  )
} 

export default App
