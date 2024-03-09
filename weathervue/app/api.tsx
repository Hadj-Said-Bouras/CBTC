"use client"
import React, { useEffect, useState } from 'react'

const api = {
    key: "ca42c9b91f5366afae64f005250483b5",
    base: 'http://api.openweathermap.org/data/2.5/'
}
function Api() {
    const [search, setSearch] = useState('')
    const [weather, setWeather] = useState({})

    const handleSearch = (e) => {
        e.preventDefault()
        searchCity()
    }

    const searchCity = async() => {
        fetch(`${api.base}forecast?id&appid=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setWeather(result)
            })
    }

  return (
    <div>
        <input type="text"
        placeholder='city'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        />
        <button onClick={handleSearch}>Search</button>

        <p></p>
    </div>
  )
}

export default Api