import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({ name,
  desc,
  data,
  handleEdit,
  handleDelete, }) => {

  console.log(data)
  return (
    <div className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>

          {name} profile
        </span>
      </h1>
      <p className='desc text-left'>
        {desc}

      </p>


      <div className="mt-16 prompt_layout">
        {data.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}

          />
        ))}
      </div>

    </div>
  )
}

export default Profile