import ProjectsComponent from '../../components/projects'
import NavBar from '../../components/navbar'

function Projects() {
  return (
    <div className='bg-gradient-to-r from-[#8c6d53] to-[#6fa0ae] h-screen overflow-hidden '>
        <NavBar />
        <ProjectsComponent />

    </div>
  )
}

export default Projects