import React, { useState, useEffect } from 'react'
import {TypeAnimation} from 'react-type-animation'

export default function Home() {
  const API_KEY = "QffKbw9RmbEka5zIyZvSobcEwvC6P3ELzbSkea3q"
  const SienceNewsAPI_KEY = "27894f3c50e642aa9d87cb06cf1d41f6"


  const [scroll,setScroll] = useState(false)
  useEffect(()=>{
    const handleScroll = ()=>{
    if(window.scrollY > window.innerHeight){
      setScroll(true)
    }else{
      setScroll(false)
    }
  }
  window.addEventListener('scroll', handleScroll)
  return ()=>{
    window.removeEventListener('scroll', handleScroll)
  }

  },[])
  

  const [APODdata, setAPODdata] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [newsData, setNewsData] = useState(null)
  const [loadingNews, setLoadingNews] = useState(false)
  const [newsError, setNewsError] = useState(false)

  let [newsPage, setNewsPage] = useState(1)
  let [newsPageSize, setNewsPageSize] = useState(20)

    const increaseNewsPage = ()=>{
      setNewsPage(newsPage++)
      console.log(newsPage)
    }
    const decreaseNewsPage = ()=>{
      if(newsPage > 0){
        setNewsPage(newsPage--)
      }
      console.log(newsPage)
  }

  

  const [sourceExist, setSourceExist] = useState(true)

  useEffect(()=>{
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
      .then((res) => {
        if (!res.ok){
          throw new Error("Network Response wasn't ok!!")
        }
        return res.json()
      })
      .then((data)=>{
        setAPODdata(data)
        console.log(data)
        setLoading(false)
      })
      .catch((error)=>{
        setError(error)
        setLoading(false)
      })

  },[])


  useEffect(()=>{
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=science&page=${newsPage}&pageSize=${newsPageSize}&apiKey=${SienceNewsAPI_KEY}`)
      .then((res) => {
        if (!res.ok){
          throw new Error("Science Network Response wasn't ok!!")
        }
        return res.json()
      })
      .then((data)=>{
        setNewsData(data)
        setLoadingNews(false)
      })
      .catch((error)=>{
        setNewsError(error)
        setLoadingNews(false)
      })
  },[])
  const listNewsData = newsData?.articles.map((item) => (
    <div className = " backdrop-blur m-4 font-martian flex shadow-[0_0_5px_1px_rgba(0,0,0,0.8)] flex-col justify-between items-start border-solid border-white border-4 border-box">
      <h1 className = "bg-black/40 p-4 font-roboto font-bold text-white w-full shadow-[0_0_20px_10px_rgba(0,0,0,0.2)_inset]">>> {item.title}</h1>
      <p className = " p-4 text-justify text-white">{item.description}</p>
      <div className = "h-full w-full flex items-end ">
        <div className = "flex w-full justify-between items-center">
          <p className = "m-4 text-white text-sm">Report by : {item.source.id}</p>
          <button className = "bg-white/60 p-2 m-2 font-roboto text-nowrap h-10 transition-all duration-200 hover:bg-black hover:text-white"><a href = {`${item.url}`}> see report</a></button>
        </div>
      </div>
      <p className = "bg-white w-full flex justify-center"> {item.publishedAt}</p>

    </div>
    


    ))

  if (loading){
    return(
      <div>
        <p className = "w-screen h-screen flex justify-center items-center font-roboto font-bold text-2xl">
              <img src = "./NASA_logo.svg.png" className = "w-[3.5rem] ml-5"/>
              <TypeAnimation

                sequence = {[
                  "LOADING...",
                  2000,
                  "",
                  2000
                  ]}
                wrapper = "span"
                speed = {50}
                deletionSpeed = {70}
                cursor = {true}
                repeat = {Infinity}
              />
        </p>
      </div>
      )
  }
  if (loadingNews){
    return(
      <div>
        <p className = "w-screen h-screen flex justify-center items-center font-roboto font-bold text-2xl">
              <img src = "./NASA_logo.svg.png" className = "w-[3.5rem] ml-5"/>
              <TypeAnimation

                sequence = {[
                  "LOADING...",
                  2000,
                  "",
                  2000
                  ]}
                wrapper = "span"
                speed = {50}
                deletionSpeed = {70}
                cursor = {true}
                repeat = {Infinity}
              />
        </p>
      </div>
      )
  }
  if (error) return <p>Error: {error.message}</p>
  if (newsError) return <p>Error: {error.message}</p>
  

  {/* #240750 */}
  {/* #344C64 */}
  {/* #577B8D */}
  {/* #57A6A1 */}
  return (
    <div>
      <nav className = {`w-screen flex justify-between items-center h-[50px] transition-all duration-400 ${scroll ? 'sticky backdrop-blur top-0 left-0 z-50 border-b-solid border-b-white border-b-4' : 'fixed  bg-white/80'}`}>
        {/* <h1 className = "text-white font-bold ml-6 text-xl cursor-pointer hover:text-blue-500">Nasa</h1> */}
        <img src = "./NASA_logo.svg.png" className = "w-[3.5rem] ml-5"/>
        <ul className = "flex">
          <li className = {`p-3 font-roboto h-[50px] flex justify-center items-center px-6 text-center cursor-pointer transition-all duration-200 ${scroll ? 'bg-transparent text-white hover:bg-white hover:text-[#240750]' : 'text-[#240750] hover:text-white'}`}>Home</li>
          <li className = {`p-3 font-roboto h-[50px] flex justify-center items-center px-6 text-center cursor-pointer transition-all duration-200 ${scroll ? 'bg-transparent text-white hover:bg-white hover:text-[#240750]' : 'text-[#240750] hover:text-white'}`}>Planets</li>
          <li className = {`p-3 font-roboto h-[50px] flex justify-center items-center px-6 text-center cursor-pointer transition-all duration-200 ${scroll ? 'bg-transparent text-white hover:bg-white hover:text-[#240750]' : 'text-[#240750] hover:text-white'}`}>Galleries</li>
          <li className = {`-3 font-roboto h-[50px] flex justify-center items-center px-6 text-center  cursor-pointer transition-all duration-200 ${scroll ? 'bg-transparent text-white hover:bg-white hover:text-[#240750]' : 'text-[#240750] hover:text-white'}`}>Facts</li>
          <li className = {`px-5 font-roboto h-[50px] flex justify-center items-center mx-2 mr-6  text-center  hover:bg-white  cursor-pointer transition-all duration-200 ${scroll ? 'text-[#240750] bg-white hover:text-white hover:bg-transparent' : ' w-[100px] text-[#240750]'}`}>About</li>
        </ul>
      </nav>

      <header className = {`flex flex-col justify-center items-center h-screen bg-cover bg-center bg-[url('${APODdata.hdurl}')]`}>
        <div>

          {/* <h1 className = "text-6xl font-martian text-white font-bold select-none text-nowrap">IMAGE OF THE DAY</h1> */}
          <div className = "text-6xl font-martian text-white font-bold select-none text-nowrap">
            <TypeAnimation

            sequence = {[
              "IMAGE OF THE DAY",
              2000,
              `${APODdata.title}`,
              3000
              ]}
            wrapper = "span"
            speed = {50}
            deletionSpeed = {70}
            cursor = {true}
            repeat = {Infinity}
            />

          </div>
          
          {/* <h1 className = "text-xl font-roboto text-white font-light select-none text-nowrap">{APODdata.title}</h1> */}


          
        </div>
        <button className = " m-6 p-2 font-roboto border-solid border-white border-2 hover:border-x-transparent text-l hover:border-x-4 text-white backdrop-invert hover:backdrop-hue-rotate-180 w-80 hover:w-screen transition-all duration-600 ease-in-out"><a href = {APODdata.hdurl}>see full image</a></button>


      </header>
      

      <section>
        <p className = "font-roboto p-2 bg-black text-white font-extrabold text-xl flex justify-center select-none hover:bg-white hover:text-black transition-colors duration-500">news</p>
        <div className = "bg-[url('https://images.unsplash.com/photo-1561998338-13ad7883b20f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <ul className = " grid grid-cols-4">
            {listNewsData}
        </ul>
        </div>
        
      </section>

      <footer>
        <div className = "bg-black text-white flex justify-center items-center h-10">created by <span className = "text-orange-500 m-2">"joseph-full-webdev"</span></div>
      </footer>

    </div>
  )
}


