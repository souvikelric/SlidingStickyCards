import { Ref, useLayoutEffect, useRef } from "react";
import styles from "./sticky.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image1 from "../../assets/1.jpg";
import Image2 from "../../assets/2.jpg";
import Image3 from "../../assets/3.jpg";
import Image4 from "../../assets/4.jpg";


export type cardDataType = {
  h1:string,
  h3:string,
  img:string
}

const cardData:cardDataType[] = [
  {"h1":"First Card","h3":"First card subInfo","img":Image1},
  {"h1":"Second Card","h3":"Second card subInfo","img":Image2},
  {"h1":"Third Card","h3":"Third card subInfo","img":Image3},
  {"h1":"Fourth Card","h3":"Fourth card subInfo","img":Image4},
]


const Sticky = () => {
    const gridRef:Ref<HTMLDivElement> = useRef(null);
    const contRef :Ref<HTMLDivElement> = useRef(null);

    const gsapFromTo = (element:HTMLElement | null,trigger:Element,
      offset:number=0
    ) => {
      gsap.fromTo(element,{
        opacity:0,
        y:'+=100%'
      },{
        scrollTrigger:{
          trigger:trigger,
          start:"top 58%",
          end:`${70 + offset}% 60%`,
          scrub:true,
          // markers:true,
          toggleActions:"play complete none reverse"
        },
        opacity:1,
        y:0
      })
    }
  
    useLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    let contClassName = contRef.current?.className;
    // console.log(contClassName);

    if(grid!==null){
      const containers = grid.querySelectorAll(`.${contClassName}`);

      containers.forEach((container,index)=> {

        gsap.to(container,{
          scrollTrigger:{
            trigger:container,
            start:"top 50%",
            end:"bottom 60%",
            scrub:true,
            // markers:true,
            toggleActions:"play complete reverse none"
          },
          scale:0.85,
          borderRadius:'40px',
          position:"sticky",
          top:`${index*10}px`
        })
        let cntH1 = container.querySelector('h1');
        let cntH3 = container.querySelector('h3');
        let img = container.querySelector('img');

        gsapFromTo(cntH1,container);
        gsapFromTo(cntH3,container,10);
        
        gsap.fromTo(img,{
          opacity:1,
          filter:"grayscale(100%)",
          scale:0.7,
        },{
          scrollTrigger:{
            trigger:container,
            start:"top 58%",
            end:`${70}% 60%`,
            scrub:1.5,
            // markers:true,
            toggleActions:"play complete none reverse"
          },
          opacity:1,
          scale:1,
          filter:"grayscale(0%)",
          borderRadius:"40px",
        })




      })

    }
    },[])
    return (
            <div ref={gridRef} className={styles.grid}>
                {cardData.map((card:cardDataType,index) => 
                    {   
                      let optionRef = index === 0 ? contRef : null;
                      return (
                        <div key={index} ref={optionRef} className={styles.containerCard}>
                          <div className={styles.col1}>
                            <div style={{overflow:"hidden"}}><h1>{card.h1}</h1></div>
                            <div style={{overflow:"hidden"}}><h3>{card.h3}</h3></div>
                          </div>
                          <div className={styles.col2}>
                            <div className={styles.imgWrapper}>
                              <img src={card.img} alt="coverImage" />
                            </div>
                          </div>
                        </div>
                        )
                    }
                )}
              </div>
            )
}

export default Sticky;