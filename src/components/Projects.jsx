import { projects,copy } from '../data/content';
import Button from './Button';
import Sparkle from './Sparkle';
import useGsap from '../hooks/useGsap';
import SplitText from './SplitText';
import './Projects.css';
export default function Projects(){
 const scope=useGsap(gsap=>{
  const cards=gsap.utils.toArray('.project-card');
  const mm=gsap.matchMedia();

  mm.add('(max-width: 520px)',()=>{
   cards.forEach(card=>{
    gsap.fromTo(card,
     {scaleX:.86,transformOrigin:'center center'},
     {scaleX:1,ease:'none',
      scrollTrigger:{
       trigger:card,
       start:'top 88%',
       end:'top 42%',
       scrub:true,
       invalidateOnRefresh:true
      }
     }
    );
   });
  });

  mm.add('(min-width: 521px)',()=>{
   cards.forEach((card,i)=>gsap.fromTo(card,
    {y:70,x:0,opacity:0},
    {y:0,x:0,opacity:1,duration:1.15+i*.18,ease:'power3.out',
     scrollTrigger:{trigger:card,start:'top 88%'}}
   ));
  });

  gsap.fromTo('.section-rule',
   {scaleX:0,transformOrigin:'left center'},
   {scaleX:1,duration:1.1,ease:'power2.out',stagger:.25,
    scrollTrigger:{trigger:'.project-grid',start:'top 80%'}}
  );

  return()=>mm.revert();
 },[]);

 return <section id="work" className="projects-section" ref={scope}>
  <div className="section-head">
   <div><h2><SplitText>{copy.projects.title}</SplitText></h2><p className="section-intro">{copy.projects.intro}</p></div>
   <Button light href="#contact">{copy.projects.viewAll}</Button>
  </div>
  <div className="section-rule"><Sparkle/></div>
  <div className="project-grid">
   {projects.map((p,i)=><article className={`project-card ${p.wide?'project-card--wide':''} ${i===0?'project-card--featured':''}`} key={i}>
    <span className="project-card__index">0{i+1} / {copy.projects.selected}</span>
    <div className="project-card__bottom">
     <div><small>{p.year}</small><h3>{p.title}</h3><p>{p.type}</p></div>
     {p.wide&&<Button light href="#contact">{copy.projects.moreInfo}</Button>}
    </div>
   </article>)}
  </div>
  <div className="section-rule"><Sparkle/></div>
 </section>;
}