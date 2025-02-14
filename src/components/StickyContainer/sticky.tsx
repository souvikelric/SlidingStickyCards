import { Ref, useLayoutEffect, useRef } from "react";
import styles from "./sticky.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image1 from "../../assets/1.jpg";
// import Image2 from "../../assets/2.jpg";
// import Image3 from "../../assets/3.jpg";
// import Image4 from "../../assets/4.jpg";

const Image1 = "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Image2 = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Image3 = "https://plus.unsplash.com/premium_photo-1676385777209-1d435cc69c5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Image4 = "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";



export type cardDataType = {
  h1:string,
  h3:string,
  img:string,
  bgColor?:string
}

const cardData:cardDataType[] = [
  {"h1":"First Card","h3":"First card subInfo","img":Image1,bgColor:"rgb(225, 53, 106)"},
  {"h1":"Second Card","h3":"Second card subInfo","img":Image2,bgColor:"rgb(27, 117, 102)"},
  {"h1":"Third Card","h3":"Third card subInfo","img":Image3,bgColor:"rgb(28, 107, 159)"},
  {"h1":"Fourth Card","h3":"Fourth card subInfo","img":Image4,bgColor:"rgb(137, 90, 191)"},
]


const Sticky = () => {
    const gridRef:Ref<HTMLDivElement> = useRef(null);
    const contRef :Ref<HTMLDivElement> = useRef(null);
    const col2Ref :Ref<HTMLDivElement> = useRef(null);

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
        let cntH1 = container.querySelector('h1');
        let cntH3 = container.querySelector('h3');
        let img = container.querySelector('img');
        let col2 = container.querySelector(`.${styles.col2}`)


        let tl = gsap.timeline()

        tl.to(container,{
          scrollTrigger:{
            trigger:container,
            start:"top 60%",
            end:"top 30%",
            scrub:true,
            toggleActions:"play complete reverse none"
          },
          scale:0.85,
          borderRadius:'40px',
          position:"sticky",
          top:`${index*10}px`
        },"<")
        .to(col2,{
            scrollTrigger:{
              trigger:container,
              start:"top 60%",
              end:"top 30%",
              scrub:true,
              toggleActions:"play complete reverse none"
            },
            borderTopRightRadius:'40px',
            borderBottomRightRadius:'40px'
        },"<")

        gsapFromTo(cntH1,container);
        gsapFromTo(cntH3,container,10);
        
        gsap.fromTo(img,{
          opacity:1,
          filter:"grayscale(100%)",
          scale:0.7,
        },{
          scrollTrigger:{
            trigger:img,
            start:"top 50%",
            end:"top 30%",
            scrub:1.5,
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
                        <div key={index} ref={optionRef} style={{backgroundColor:"white"}}
                        className={styles.containerCard}>
                          <div className={styles.col1}>
                            <div style={{overflow:"hidden"}}><h1>{card.h1}</h1></div>
                            <div style={{overflow:"hidden"}}><h3>{card.h3}</h3></div>
                          </div>
                          <div ref={col2Ref} className={styles.col2} style={{backgroundColor:card.bgColor}}>
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