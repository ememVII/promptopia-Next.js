
import PromptCard from '@components/PromptCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  // Protected Route
  const {data: session} = useSession()
  const router = useRouter()
  if(!session) router.push('/')
  
  return (
    <section className="w-full">
      <h1 className='head_text text-left'><span className='blue_gradient'>{name} Profile</span></h1>
      <p className='desc text-left'>{desc}</p>
      
      <div className='mt-10 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleEdit={() => handleEdit && handleEdit(post)} handleDelete={() => handleDelete && handleDelete(post)}/>
      ))}
    </div>
    </section>
  )
}

export default Profile