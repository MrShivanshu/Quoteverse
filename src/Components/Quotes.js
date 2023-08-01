import React from 'react'
import QuoteItem from './QuoteItem'
import Skeleton from './Skeleton'


export default function Quotes({posts, section, dataLoading}){
  return (
      <>
     <div id='quote-area' className={`${section === "Trending" ? "flex justify-center flex-col gap-10 p-2 py-8 sm:p-8": "grid gap-6" }`}>
      
      <h1 id='quotes-heading' className="text-2xl  sm:text-6xl">{section} Quotes :</h1>
      {dataLoading ? <Skeleton type="quotes"/> : 
      <>{posts.map((post)=>{
          return <QuoteItem key={post._id} description={post.quote} title={post.title} creator={post.creator} date={post.date || ""} />
        })}
        </>}
    </div>
    
    </>
  )
}
