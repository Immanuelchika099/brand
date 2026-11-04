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
   gsap.set(cards,{
    position:'relative',
    zIndex:i=>i+1,
    y:i=>i===0?42:72+(i-1)*18,
    scale:i=>1-i*.035,
    opacity:0,
    transformOrigin:'center center'
   });

   const stack=gsap.timeline({
    scrollTrigger:{
     trigger:'.project-grid',
     start:'top 24%',
     end:'+=145%',
     scrub:0.8,
     pin:true,
     anticipatePin:1,
     invalidateOnRefresh:true
    }
   });

   stack.to(cards[0],{
    y:0,
    scale:1,
    opacity:1,
    duration:0.8,
    ease:'power2.out'
   },0);

   cards.forEach((card,i)=>{
    if(i===0)return;
    const at=0.8+(i-1)*1.05;

    stack.to(card,{
     y:0,
     scale:1,
     opacity:1,
     duration:1,
     ease:'power2.out'
    },at);

    cards.slice(0,i).forEach((previous,j)=>{
     const depth=i-j;
     stack.to(previous,{
      y:-16*depth,
      scale:1-.035*depth,
      opacity:Math.max(.28,.72-(depth-1)*.2),
      duration:1,
      ease:'power2.out'
     },at);
    });
   });

   return()=>{
    stack.scrollTrigger?.kill();
    stack.kill();
   };
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