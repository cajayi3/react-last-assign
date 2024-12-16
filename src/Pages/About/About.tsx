import Background from '../../assets/images/spider.jpg'
import '../About/About.css'

function About() {
  return (
    <div className='spider' style={{ backgroundImage: `url(${ Background })`}} >
      <h1 className='about'>About</h1>
      <p className='concept'>This concept explains the origin and abilities of individuals who've come save the day when your in time of need.
        In the pursuit to change lives and create a safe environment all while fighting everyday crime in a thriving city.
        To play a vital role in being a hero for kids, giving hope and inspiration
        to many for various reasons may push unintentional generosity in the communities. 
        Lifes could be changed in the blink of an eye due to unfortunate circumstances of horrendous situations...</p>
      <p className='protect'>Who's  going to protect you at night? </p>
      </div>
  )
}

export default About;