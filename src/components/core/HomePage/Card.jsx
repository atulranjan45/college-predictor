import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./CTAButton";

function Card({card}){
    console.log(card);
    return(
        <div className="relative bg-white text-richblue-400 rounded-md mx-10 my-10 felx flex-col w-[310px] h-[350px] transition-all duration-700 hover:shadow-2xl">
            <div className="flex flex-col">
                <img src={card.image} alt="CollegeImage" loading="lazy" className="h-[230px] w-[240px] mt-5 mx-auto"/>
                <div className="mt-4 w-[290px] h-[3px] mx-auto bg-richblack-700"></div>
                <div className="w-[260px] mx-auto mt-1 font-bold">
                    <p>{card.name}</p>
                </div>
            </div>
            <div className="w-[140px] absolute bottom-0 mt-2 mx-auto translate-x-20 translate-y-6">
                <CTAButton active={true} linkto={"/"}>
                    <div className="flex items-center gap-2">
                        Visit Site
                        <FaArrowRight/>
                    </div>
                </CTAButton>
            </div>
        </div>
    )
}

export default Card;